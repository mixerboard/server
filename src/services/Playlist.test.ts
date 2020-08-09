import Playlist from "./Playlist";
import Track from "./Track";

describe("Playlist", () => {
  it("constructs", () => {
    const track = new Track("name", "artist");
    const playlist = new Playlist("name", [track]);

    expect(playlist).toHaveProperty("id");
    expect(playlist.name).toBe("name");
    expect(playlist.tracks).toContain(track);
  });

  it("adds new track", () => {
    const playlist = new Playlist("name");
    const track = new Track("Track Name", "Track Artist");
    playlist.addTrack(track);

    expect(playlist.tracks).toContain(track);
  });
});
