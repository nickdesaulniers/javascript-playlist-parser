// http://gonze.com/playlists/playlist-format-survey.html#M3U

function parse (playlist) {
  return playlist.split("\n").filter(function (line) {
    if (line.length === 0) {
      return false;
    }

    return true;
  }).map(function (string) {
    return {
      location: string,
    };
  });
};

if (module && module.exports) {
  module.exports = {
    name: "m3u",
    parse: parse,
  };
}

