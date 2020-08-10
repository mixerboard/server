jest.mock("superagent");

import superagent from "superagent";
import Spotify from "./Spotify";
import normalizeUrl from "normalize-url";

describe("spotify", () => {
  it("constructs", () => {
    expect.assertions(3);

    const spotify = new Spotify("clientId", "clientSecret", "redirectUri");

    expect(spotify).toHaveProperty("clientId");
    expect(spotify).toHaveProperty("clientSecret");
    expect(spotify).toHaveProperty("redirectUri");
  });

  it("gets request authorization url", () => {
    expect.assertions(1);

    const spotify = new Spotify("clientId", "clientSecret", "redirectUri");
    const requestAuthorizationUrl = spotify.getRequestAuthorizationUrl();
    const expectedRequestAuthorizationUrl =
      "https://accounts.spotify.com/authorize?response_type=code&client_id=clientId&redirect_uri=redirectUri";

    expect(normalizeUrl(requestAuthorizationUrl.toString())).toBe(
      normalizeUrl(expectedRequestAuthorizationUrl)
    );
  });

  it("gets tokens", async () => {
    expect.assertions(1);

    const mockResponse = {
      body: { access_token: "accessToken", refresh_token: "refreshToken" },
    };
    (superagent.post as jest.Mock).mockReturnValueOnce(mockResponse);

    const spotify = new Spotify("clientId", "clientSecret", "redirectUri");
    const code = "code";

    spotify.getTokens(code);

    expect(1).toBe(1);
  });
});
