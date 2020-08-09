import Track from "./Track";
import Album from "./Album";
import Playlist from "./Playlist";

class Library {
  constructor(
    readonly tracks: Track[] = [],
    readonly albums: Album[] = [],
    readonly playlists: Playlist[] = []
  ) {
    this.tracks = tracks;
    this.albums = albums;
    this.playlists = playlists;
  }

  public addTrack(track: Track): void {
    this.tracks.push(track);
  }

  public addAlbum(album: Album): void {
    this.albums.push(album);
  }

  public addPlaylist(playlist: Playlist): void {
    this.playlists.push(playlist);
  }
}

export default Library;
