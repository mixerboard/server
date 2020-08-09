import Track from "./Track";
import Item from "./Item";

class Playlist extends Item {
  constructor(name: string, readonly tracks: Track[] = []) {
    super(name);
    this.tracks = tracks;
  }

  public addTrack(track: Track): void {
    this.tracks.push(track);
  }
}

export default Playlist;
