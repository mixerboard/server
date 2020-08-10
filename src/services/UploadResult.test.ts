import UploadResult from "./UploadResult";
import Library from "./Library";
import Track from "./Track";
import Album from "./Album";
import Playlist from "./Playlist";

describe("upload-result", () => {
  it("constructs", () => {
    expect.assertions(2);

    const uploaded = new Library(
      [new Track("name", "artist")],
      [new Album("name", "artist")],
      [new Playlist("name", [new Track("name", "artist")])]
    );
    const failed = new Library(
      [new Track("name", "artist")],
      [new Album("name", "artist")],
      [new Playlist("name", [new Track("name", "artist")])]
    );
    const uploadResult = new UploadResult(uploaded, failed);

    expect(uploadResult.uploaded).toBe(uploaded);
    expect(uploadResult.failed).toBe(failed);
  });

  it("constructs with defaults", () => {
    expect.assertions(2);

    const uploadResult = new UploadResult();

    expect(uploadResult.uploaded).toStrictEqual(new Library());
    expect(uploadResult.failed).toStrictEqual(new Library());
  });
});
