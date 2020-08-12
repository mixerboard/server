import Spotify from "./Spotify";
import normalizeUrl from "normalize-url";

describe("spotify", () => {
  it("constructs", () => {
    expect.assertions(7);

    const spotify = new Spotify("clientId", "clientSecret", "redirectUri");

    expect(spotify).toHaveProperty("clientId");
    expect(spotify).toHaveProperty("clientSecret");
    expect(spotify).toHaveProperty("redirectUri");

    expect(spotify).toHaveProperty("getRequestAuthUrl");
    expect(spotify).toHaveProperty("getTokens");
    expect(spotify).toHaveProperty("pullLibrary");
    expect(spotify).toHaveProperty("pushLibrary");
  });

  it("gets request authorization url", () => {
    expect.assertions(1);

    const spotify = new Spotify("clientId", "clientSecret", "redirectUri");
    const requestAuthUrl = spotify.getRequestAuthUrl();
    const expectedRequestAuthUrl =
      "https://accounts.spotify.com/authorize?response_type=code&client_id=clientId&redirect_uri=redirectUri";

    expect(normalizeUrl(requestAuthUrl.toString())).toBe(
      normalizeUrl(expectedRequestAuthUrl)
    );
  });
});
