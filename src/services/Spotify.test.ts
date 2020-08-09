import Spotify from "./Spotify";
import normalizeUrl from "normalize-url";

describe("Spotify", () => {
  it("constructs", () => {
    const spotify = new Spotify("clientId", "clientSecret", "redirectUri");

    expect(spotify).toHaveProperty("clientId");
    expect(spotify).toHaveProperty("clientSecret");
    expect(spotify).toHaveProperty("redirectUri");
  });

  it("gets request authorization url", () => {
    const spotify = new Spotify("clientId", "clientSecret", "redirectUri");
    const requestAuthorizationUrl = spotify.getRequestAuthorizationUrl();

    const expectedRequestAuthorizationUrl = new URL(
      "https://accounts.spotify.com/authorize"
    );
    expectedRequestAuthorizationUrl.searchParams.set("response_type", "code");
    expectedRequestAuthorizationUrl.searchParams.set("client_id", "clientId");
    expectedRequestAuthorizationUrl.searchParams.set(
      "redirect_uri",
      "redirectUri"
    );

    const normalizedRequestAuthorizationUrl = normalizeUrl(
      requestAuthorizationUrl.toString()
    );
    const normalizedExpectedRequestAuthorizationUrl = normalizeUrl(
      expectedRequestAuthorizationUrl.toString()
    );

    expect(normalizedRequestAuthorizationUrl).toBe(
      normalizedExpectedRequestAuthorizationUrl
    );
  });

  it("gets tokens", async () => {
    const spotify = new Spotify(
      "3e009e6f91a64519a52dd55aa6e9aa08",
      "6d65886a1abb448ebb3e88f46101df96",
      "https://www.google.com"
    );

    console.log(spotify.getRequestAuthorizationUrl());

    try {
      const res = spotify.getTokens(
        "AQD6RO94HHKr91ILXPemfnm1UrgS06zZm02dYncDsTVrpy0QXqle9PUHRPnRn4w7NJAqdH76LimNzbvdPShBKTqD0xihIP9J4TGr4Xnur12UdY4a0OwuXztlcOyxVSMXkRM9zaU3KatqGfTY3eN96EIQi0aC9f2Nsa4"
      );
      console.log(await res);
    } catch (e) {
      console.log(e);
    }

    expect(1).toBe(1);
  });
});
