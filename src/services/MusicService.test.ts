import MusicService from "./MusicService";
import Library from "./Library";
import UploadResult from "./UploadResult";

describe("music service", () => {
  it("constructs properties in concrete class", () => {
    expect.assertions(2);

    class ConcreteClass extends MusicService {
      constructor() {
        super();
      }

      fetchLibrary() {
        return new Library();
      }

      uploadLibrary() {
        return new UploadResult();
      }
    }
    const concreteClassInstance = new ConcreteClass();

    expect(concreteClassInstance.fetchLibrary()).toStrictEqual(new Library());
    expect(concreteClassInstance.uploadLibrary()).toStrictEqual(
      new UploadResult()
    );
  });
});
