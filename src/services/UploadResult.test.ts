import UploadResult from "./UploadResult";
import Library from "./Library";
import Track from "./Track";
import Album from "./Album";
import Playlist from "./Playlist";

describe("UploadResult", () => {
  it("constructs", () => {
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
    const uploadResult = new UploadResult();

    expect(uploadResult.uploaded).toEqual(new Library());
    expect(uploadResult.failed).toEqual(new Library());
  });
});
