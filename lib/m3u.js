// http://gonze.com/playlists/playlist-format-survey.html#M3U

function empty (line) {
  return !!line.length;
};

function toSong (string) {
  return {
    location: string,
  };
};

function parse (playlist) {
  return playlist.split("\n").filter(empty).map(toSong);
};

if (module && module.exports) {
  module.exports = {
    name: "m3u",
    parse: parse,
  };
}

