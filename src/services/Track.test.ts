import Track from "./Track";

describe("track", () => {
  it("constructs", () => {
    expect.assertions(3);

    const track = new Track("name", "artist");

    expect(track).toHaveProperty("id");
    expect(track.name).toBe("name");
    expect(track.artist).toBe("artist");
  });
});
