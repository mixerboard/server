import Album from "./Album";

describe("album", () => {
  it("constructs", () => {
    expect.assertions(3);

    const album = new Album("name", "artist");

    expect(album).toHaveProperty("id");
    expect(album.name).toBe("name");
    expect(album.artist).toBe("artist");
  });
});
