import superagent from "superagent";
import MusicService from "./MusicService";
import Library from "./Library";
import UploadResult from "./UploadResult";

class Spotify extends MusicService {
  constructor(
    private clientId: string,
    private clientSecret: string,
    private redirectUri: string
  ) {
    super();
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  getRequestAuthUrl(): URL {
    const requestAuthUrl = new URL("https://accounts.spotify.com/authorize");
    requestAuthUrl.searchParams.set("client_id", this.clientId);
    requestAuthUrl.searchParams.set("response_type", "code");
    requestAuthUrl.searchParams.set("redirect_uri", this.redirectUri);

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

  async pullLibrary(): Promise<Library> {
    return new Library();
  }

  async pushLibrary(library: Library): Promise<UploadResult> {
    return new UploadResult();
  }
}

export default Spotify;
