// http://gonze.com/playlists/playlist-format-survey.html#M3U

const EXTENDED = "#EXTM3U";
const COMMENT_RE = /:(.+),(.+)-(.+)\n(.+)/;

// #EXTINF:822,Iron Maiden - Rime of the Ancient Mariner
function extended (line) {
  var match = line.match(COMMENT_RE);
  if (match && match.length === 5) {
    return {
      duration: match[1],
      artist: match[2],
      title: match[3],
      location: match[4],
    };
  }
};

function empty (line) {
  return !!line.trim().length;
};

function toSong (string) {
  return {
    location: string,
  };
};

function parse (playlist) {
  var firstNewline = playlist.search("\n");
  if (playlist.substr(0, firstNewline) === EXTENDED) {
    return playlist.substr(firstNewline).split("#").filter(empty).map(extended);
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

