import Item from "./Item";

class Album extends Item {
  constructor(name: string, readonly artist: string) {
    super(name);
    this.artist = artist;
  }
}
export default Album;
