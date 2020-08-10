import Spotify from "./Spotify";
import normalizeUrl from "normalize-url";

describe("spotify", () => {
  it("constructs", () => {
    expect.assertions(7);

    const spotify = new Spotify("clientId", "clientSecret", "redirectUri");

    // Properties
    expect(spotify).toHaveProperty("clientId");
    expect(spotify).toHaveProperty("clientSecret");
    expect(spotify).toHaveProperty("redirectUri");

    // Methods
    expect(spotify).toHaveProperty("getRequestAuthorizationUrl");
    expect(spotify).toHaveProperty("getTokens");
    expect(spotify).toHaveProperty("pullLibrary");
    expect(spotify).toHaveProperty("pushLibrary");
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
});
