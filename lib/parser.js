(function() {
  var COMMENT_RE, EXTENDED, comments, empty, extended, parse, simple;

  EXTENDED = "#EXTM3U";

  COMMENT_RE = /:(-?\d+),(.+)\s*-\s*(.+)\n(.+)/;

  extended = function(line) {
    var match;
    match = line.match(COMMENT_RE);
    if (match && match.length === 5) {
      return {
        length: match[1],
        artist: match[2],
        title: match[3],
        file: match[4].trim()
      };
    }
  };

  simple = function(string) {
    return {
      file: string.trim()
    };
  };

  empty = function(line) {
    return !!line.trim().length;
  };

  comments = function(line) {
    return line[0] !== '#';
  };

  parse = function(playlist) {
    var firstNewline;
    firstNewline = playlist.search("\n");
    if (playlist.substr(0, firstNewline) === EXTENDED) {
      return playlist.substr(firstNewline).split("#").filter(empty).map(extended);
    } else {
      return playlist.split("\n").filter(empty).filter(comments).map(simple);
    }
  };

  (typeof module !== "undefined" && module !== null ? module.exports : window).M3U = {
    name: "m3u",
    parse: parse
  };

}).call(this);

(function() {
  var LISTING_RE, parse;

  LISTING_RE = /(file|title|length)(\d+)=(.+)\r?/i;

  parse = function(playlist) {
    var index, key, line, match, tracks, value, _, _i, _len, _ref;
    tracks = [];
    _ref = playlist.trim().split('\n');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      line = _ref[_i];
      match = line.match(LISTING_RE);
      if (match && match.length === 4) {
        _ = match[0], key = match[1], index = match[2], value = match[3];
        if (!tracks[index]) {
          tracks[index] = {};
        }
        tracks[index][key.toLowerCase()] = value;
      }
    }
    return tracks.filter(function(track) {
      return track != null;
    });
  };

  (typeof module !== "undefined" && module !== null ? module.exports : window).PLS = {
    name: "pls",
    parse: parse
  };

}).call(this);
