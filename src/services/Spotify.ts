import superagent from "superagent";
import Library from "./Library";
import Track from "./Track";
import Album from "./Album";
import Playlist from "./Playlist";
import PushResult from "./PushResult";

class Spotify {
  constructor(
    private clientId: string,
    private clientSecret: string,
    private redirectUri: string
  ) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  getRequestAuthUrl(): URL {
    const requestAuthUrl = new URL("https://accounts.spotify.com/authorize");
    const scopes = [
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-private",
      "user-library-read",
      "user-library-modify",
    ];

    requestAuthUrl.searchParams.set("client_id", this.clientId);
    requestAuthUrl.searchParams.set("response_type", "code");
    requestAuthUrl.searchParams.set("redirect_uri", this.redirectUri);
    requestAuthUrl.searchParams.set("scope", scopes.join(","));

    return requestAuthUrl;
  }

  async getTokens(
    code: string = null,
    refreshToken: string = null
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: string }> {
    const {
      body: {
        access_token: accessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn,
      },
    } = await superagent
      .post("https://accounts.spotify.com/api/token")
      .type("form")
      .send({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
        grant_type: code ? "authorization_code" : "refresh_token",
        refresh_token: refreshToken,
        code,
      });

    return { accessToken, refreshToken: newRefreshToken, expiresIn };
  }

  async pullLibrary(authToken: string): Promise<Library> {
    const recurseApiRequest = async (url: string) => {
      const {
        body: { items, next },
      } = await superagent
        .get(url)
        .auth(authToken, { type: "bearer" })
        .query({ limit: 50 });

      if (process.env.NODE_ENV === "production") {
        return [...items, ...(next ? await recurseApiRequest(next) : [])];
      } else {
        return [...items];
      }
    };

    const parseArtists = (artists: Record<string, unknown>[]) => {
      return artists
        .map((artist: Record<string, unknown>) => artist.name)
        .join(", ");
    };

    const parseTrack = ({ track: { name, artists } }) =>
      new Track(name, parseArtists(artists));

    const parseAlbum = ({ album: { name, artists } }) =>
      new Album(name, parseArtists(artists));

    const parsePlaylist = async ({ name, tracks: { href } }) =>
      new Playlist(name, (await recurseApiRequest(href)).map(parseTrack));

    return new Library(
      (await recurseApiRequest("https://api.spotify.com/v1/me/tracks")).map(
        parseTrack
      ),
      (await recurseApiRequest("https://api.spotify.com/v1/me/albums")).map(
        parseAlbum
      ),
      await Promise.all<Playlist>(
        (
          await recurseApiRequest("https://api.spotify.com/v1/me/playlists")
        ).map(parsePlaylist)
      )
    );
  }

  async pushLibrary(authToken: string, library: Library): Promise<PushResult> {
    const searchSpotify = async (query: string, type: string) => {
      const { body } = await superagent
        .get("https://api.spotify.com/v1/search")
        .auth(authToken, { type: "bearer" })
        .query({ q: query, type, limit: 1 });

      return body;
    };

    const pushTrack = async (track: Track) => {
      try {
        await superagent
          .put("https://api.spotify.com/v1/me/tracks")
          .auth(authToken, { type: "bearer" })
          .query({
            ids: (await searchSpotify(`${track.name} ${track.artist}`, "track"))
              .tracks.items?.[0].id,
          });

        return true;
      } catch {
        return false;
      }
    };

    const pushAlbum = async (album: Album) => {
      try {
        await superagent
          .put("https://api.spotify.com/v1/me/albums")
          .auth(authToken, { type: "bearer" })
          .query({
            ids: (await searchSpotify(`${album.name} ${album.artist}`, "album"))
              .albums.items?.[0].id,
          });

        return true;
      } catch {
        return false;
      }
    };

    const getUserProfile = async () => {
      const { body } = await superagent
        .get("https://api.spotify.com/v1/me")
        .auth(authToken, { type: "bearer" });

      return body;
    };

    const createNewPlaylist = async (name: string, userId: string) => {
      const { body } = await superagent
        .post(`https://api.spotify.com/v1/users/${userId}/playlists`)
        .auth(authToken, { type: "bearer" })
        .send({ name, public: false });

      return body;
    };

    const addTrackToPlaylist = async (playlistId: string, trackUri: string) => {
      await superagent
        .post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`)
        .auth(authToken, { type: "bearer" })
        .send({ uris: [trackUri] });
    };

    const pushPlaylist = async (playlist: Playlist) => {
      try {
        const { id: userId } = await getUserProfile();
        const { id: playlistId } = await createNewPlaylist(
          playlist.name,
          userId
        );

        for (const track of playlist.tracks) {
          const {
            tracks: {
              items: [{ uri: trackUri }],
            },
          } = await searchSpotify(`${track.name} ${track.artist}`, "track");

          addTrackToPlaylist(playlistId, trackUri);
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    };

    const pushed = new Library();
    const failed = new Library();

    for (const track of library.tracks) {
      (await pushTrack(track))
        ? pushed.addTrack(track)
        : failed.addTrack(track);
    }

    for (const album of library.albums) {
      (await pushAlbum(album))
        ? pushed.addAlbum(album)
        : failed.addAlbum(album);
    }

    for (const playlist of library.playlists) {
      (await pushPlaylist(playlist))
        ? pushed.addPlaylist(playlist)
        : failed.addPlaylist(playlist);
    }

    return new PushResult(pushed, failed);
  }
}

export default Spotify;
