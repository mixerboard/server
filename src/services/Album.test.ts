import Album from "./Album";

describe("Album", () => {
  it("constructs", () => {
    const album = new Album("name", "artist");

    expect(album).toHaveProperty("id");
    expect(album.name).toBe("name");
    expect(album.artist).toBe("artist");
  });
});
