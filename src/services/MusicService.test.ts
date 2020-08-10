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

      pullLibrary() {
        return new Library();
      }

      pushLibrary() {
        return new UploadResult();
      }
    }
    const concreteClassInstance = new ConcreteClass();

    expect(concreteClassInstance.pullLibrary()).toStrictEqual(new Library());
    expect(concreteClassInstance.pushLibrary()).toStrictEqual(
      new UploadResult()
    );
  });
});
