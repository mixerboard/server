import { v4 as uuid } from "uuid";

class Track {
  readonly id: string;
  readonly name: string;
  readonly artist: string;

  constructor(name: string, artist: string) {
    this.id = uuid();
    this.name = name;
    this.artist = artist;
  }
}

export default Track;
