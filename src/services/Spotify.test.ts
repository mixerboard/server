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
    const expectedRequestAuthUrl = new URL(
      "https://accounts.spotify.com/authorize"
    );
    expectedRequestAuthUrl.searchParams.set("client_id", "clientId");
    expectedRequestAuthUrl.searchParams.set("response_type", "code");
    expectedRequestAuthUrl.searchParams.set("redirect_uri", "redirectUri");
    expectedRequestAuthUrl.searchParams.set(
      "scope",
      [
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-private",
        "user-library-read",
        "user-library-modify",
      ].join(",")
    );

    expect(normalizeUrl(requestAuthUrl.toString())).toBe(
      normalizeUrl(expectedRequestAuthUrl.toString())
    );
  });
});
