import Library from "./Library";
import Track from "./Track";
import Album from "./Album";
import Playlist from "./Playlist";

describe("library", () => {
  it("constructs", () => {
    expect.assertions(3);

    const tracks = [new Track("name", "artist")];
    const albums = [new Album("name", "artist")];
    const playlists = [new Playlist("name")];
    const library = new Library(tracks, albums, playlists);

    expect(library.tracks).toStrictEqual(tracks);
    expect(library.albums).toStrictEqual(albums);
    expect(library.playlists).toStrictEqual(playlists);
  });

  it("adds new track", () => {
    expect.assertions(1);

    const library = new Library();
    const newTrack = new Track("name", "artist");
    library.addTrack(newTrack);

    expect(library.tracks).toContain(newTrack);
  });

  it("adds new album", () => {
    expect.assertions(1);

    const library = new Library();
    const newAlbum = new Album("name", "artist");
    library.addAlbum(newAlbum);

    expect(library.albums).toContain(newAlbum);
  });

  it("adds new playlist", () => {
    expect.assertions(1);

    const library = new Library();
    const newPlaylist = new Playlist("name");
    library.addPlaylist(newPlaylist);

    expect(library.playlists).toContain(newPlaylist);
  });
});
