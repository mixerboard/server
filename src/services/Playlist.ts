import { v4 as uuid } from "uuid";
import Track from "./Track";

class Playlist {
  readonly id: string;
  readonly name: string;
  private tracks: Track[];

  constructor(name: string, tracks: Track[]) {
    this.id = uuid();
    this.name = name;
    this.tracks = tracks;
  }

  public addTrack(track: Track): void {
    this.tracks.push(track);
  }
}

export default Playlist;
