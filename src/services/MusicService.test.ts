import MusicService from "./MusicService";
import Library from "./Library";
import UploadResult from "./UploadResult";

describe("MusicService", () => {
  it("constructs properties in concrete class", () => {
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

    expect(concreteClassInstance.fetchLibrary()).toEqual(new Library());
    expect(concreteClassInstance.uploadLibrary()).toEqual(new UploadResult());
  });
});
