import Library from "./Library";

class UploadResult {
  constructor(
    public uploaded: Library = new Library(),
    public failed: Library = new Library()
  ) {
    this.uploaded = uploaded;
    this.failed = failed;
  }
}

export default UploadResult;
