import Track from "./Track";

describe("Track", () => {
  it("constructs", () => {
    const track = new Track("name", "artist");

    expect(track).toHaveProperty("id");
    expect(track.name).toBe("name");
    expect(track.artist).toBe("artist");
  });
});
