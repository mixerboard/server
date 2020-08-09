import Item from "./Item";

class Track extends Item {
  constructor(name: string, readonly artist: string) {
    super(name);
    this.artist = artist;
  }
}

export default Track;
