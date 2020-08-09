import Library from "./Library";
import UploadResult from "./UploadResult";

abstract class MusicService {
  abstract fetchLibrary(): Library;
  abstract uploadLibrary(library: Library): UploadResult;
}

export default MusicService;
