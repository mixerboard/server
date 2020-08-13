import superagent from "superagent";
import Library from "./Library";
import UploadResult from "./UploadResult";
import Track from "./Track";

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
    const getTracks = async () => {
      const tracks = [];
      let nextUrl = "https://api.spotify.com/v1/me/tracks";

      while (nextUrl) {
        const {
          body: { items, next },
        } = await superagent
          .get(nextUrl)
          .auth(authToken, { type: "bearer" })
          .query({ limit: 50 });

        tracks.push(...items);
        nextUrl = next;
        // TEMP!!
        nextUrl = null;
      }

      return tracks.map(
        ({ track: { name, artists } }) =>
          new Track(
            name,
            artists.map((artist: Record<string, unknown>) => artist.name).join()
          )
      );
    };

    const library = new Library();
    const tracks = await getTracks();

    tracks.forEach((track) => library.addTrack(track));

    return library;
  }

  async pushLibrary(library: Library): Promise<UploadResult> {
    return new UploadResult();
  }
}

export default Spotify;
