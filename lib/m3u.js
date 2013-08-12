// http://gonze.com/playlists/playlist-format-survey.html#M3U

const EXTENDED = "#EXTM3U";

function empty (line) {
  return !!line.length;
};

function toSong (string) {
  return {
    location: string,
  };
};

function parse (playlist) {
  const split = playlist.split("\n");
  if (split[0] === EXTENDED) {
    return [];
  } else {
    return playlist.split("\n").filter(empty).map(toSong);
  }
};

if (module && module.exports) {
  module.exports = {
    name: "m3u",
    parse: parse,
  };
}

