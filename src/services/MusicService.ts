import Library from "./Library";
import UploadResult from "./UploadResult";

abstract class MusicService {
  abstract pullLibrary(): Library;
  abstract pushLibrary(library: Library): UploadResult;
}

export default MusicService;
