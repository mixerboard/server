import Library from "./Library";
import Track from "./Track";
import Album from "./Album";
import Playlist from "./Playlist";
import PushResult from "./PushResult";

describe("upload-result", () => {
  it("constructs", () => {
    expect.assertions(2);

    const pushed = new Library(
      [new Track("name", "artist")],
      [new Album("name", "artist")],
      [new Playlist("name", [new Track("name", "artist")])]
    );
    const failed = new Library(
      [new Track("name", "artist")],
      [new Album("name", "artist")],
      [new Playlist("name", [new Track("name", "artist")])]
    );
    const pushResult = new PushResult(pushed, failed);

    expect(pushResult.pushed).toBe(pushed);
    expect(pushResult.failed).toBe(failed);
  });

  it("constructs with defaults", () => {
    expect.assertions(2);

    const pushResult = new PushResult();

    expect(pushResult.pushed).toStrictEqual(new Library());
    expect(pushResult.failed).toStrictEqual(new Library());
  });
});
