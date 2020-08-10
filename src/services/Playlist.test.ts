import Playlist from "./Playlist";
import Track from "./Track";

describe("playlist", () => {
  it("constructs", () => {
    expect.assertions(3);
    const track = new Track("name", "artist");
    const playlist = new Playlist("name", [track]);

    expect(playlist).toHaveProperty("id");
    expect(playlist.name).toBe("name");
    expect(playlist.tracks).toContain(track);
  });

  it("adds new track", () => {
    expect.assertions(1);

    const playlist = new Playlist("name");
    const track = new Track("Track Name", "Track Artist");
    playlist.addTrack(track);

    expect(playlist.tracks).toContain(track);
  });
});
