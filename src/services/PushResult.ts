import Library from "./Library";

class PushResult {
  constructor(
    public pushed: Library = new Library(),
    public failed: Library = new Library()
  ) {
    this.pushed = pushed;
    this.failed = failed;
  }
}

export default PushResult;
