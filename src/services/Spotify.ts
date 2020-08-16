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

    requestAuthUrl.searchParams.set("client_id", this.clientId);
    requestAuthUrl.searchParams.set("response_type", "code");
    requestAuthUrl.searchParams.set("redirect_uri", this.redirectUri);
    requestAuthUrl.searchParams.set(
      "scope",
      [
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-private",
        "user-library-read",
        "user-library-modify",
      ].join(",")
    );

    return requestAuthUrl;
  }

  async getTokens(
    code: string
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: string }> {
    const {
      body: {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
      },
    } = await superagent
      .post("https://accounts.spotify.com/api/token")
      .type("form")
      .send({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
        grant_type: "authorization_code",
        code,
      });

    return { accessToken, refreshToken, expiresIn };
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
        .join();
    };

    const parseTrack = ({ track: { name, artists } }) =>
      new Track(name, parseArtists(artists));

    const parseAlbum = ({ album: { name, artists } }) =>
      new Album(name, parseArtists(artists));

    const parsePlaylist = async ({ name, tracks: { href } }) =>
      new Playlist(name, (await recurseApiRequest(href)).map(parseTrack));

    const tracks = (
      await recurseApiRequest("https://api.spotify.com/v1/me/tracks")
    ).map(parseTrack);

    const albums = (
      await recurseApiRequest("https://api.spotify.com/v1/me/albums")
    ).map(parseAlbum);

    const playlists = await Promise.all<Playlist>(
      (await recurseApiRequest("https://api.spotify.com/v1/me/playlists")).map(
        parsePlaylist
      )
    );

    return new Library(tracks, albums, playlists);
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

    const pushed = new Library();
    const failed = new Library();

    // Push tracks
    for (const track of library.tracks) {
      (await pushTrack(track))
        ? pushed.addTrack(track)
        : failed.addTrack(track);
    }

    return new PushResult(pushed, failed);
  }
}

export default Spotify;
