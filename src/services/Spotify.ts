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

  getRequestAuthorizationUrl(): URL {
    const requestAuthorizationUrl = new URL(
      "https://accounts.spotify.com/authorize"
    );
    requestAuthorizationUrl.searchParams.set("client_id", this.clientId);
    requestAuthorizationUrl.searchParams.set("response_type", "code");
    requestAuthorizationUrl.searchParams.set("redirect_uri", this.redirectUri);

    return requestAuthorizationUrl;
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

  pullLibrary(): Library {
    return new Library();
  }

  pushLibrary(library: Library): UploadResult {
    console.log(library);
    return new UploadResult();
  }
}

export default Spotify;
