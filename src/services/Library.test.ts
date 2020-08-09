import Library from "./Library";
import Track from "./Track";
import Album from "./Album";
import Playlist from "./Playlist";

describe("Library", () => {
  it("constructs", () => {
    const tracks = [new Track("name", "artist")];
    const albums = [new Album("name", "artist")];
    const playlists = [new Playlist("name")];
    const library = new Library(tracks, albums, playlists);

    expect(library.tracks).toEqual(tracks);
    expect(library.albums).toEqual(albums);
    expect(library.playlists).toEqual(playlists);
  });

  it("adds new track", () => {
    const library = new Library();
    const newTrack = new Track("name", "artist");
    library.addTrack(newTrack);

    expect(library.tracks).toContain(newTrack);
  });

  it("adds new album", () => {
    const library = new Library();
    const newAlbum = new Album("name", "artist");
    library.addAlbum(newAlbum);

    expect(library.albums).toContain(newAlbum);
  });

  it("adds new playlist", () => {
    const library = new Library();
    const newPlaylist = new Playlist("name");
    library.addPlaylist(newPlaylist);

    expect(library.playlists).toContain(newPlaylist);
  });
});
