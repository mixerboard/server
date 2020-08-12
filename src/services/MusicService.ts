import Library from "./Library";
import UploadResult from "./UploadResult";

abstract class MusicService {
  abstract async pullLibrary(): Promise<Library>;
  abstract async pushLibrary(library: Library): Promise<UploadResult>;
}

export default MusicService;
