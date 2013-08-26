(function() {
  var COMMENT_RE, EXTENDED, empty, extended, parse, simple;

  EXTENDED = "#EXTM3U";

  COMMENT_RE = /:(\d+),(.+)\s*-\s*(.+)\n(.+)/;

  extended = function(line) {
    var match;
    match = line.match(COMMENT_RE);
    if (match && match.length === 5) {
      return {
        duration: match[1],
        artist: match[2],
        title: match[3],
        location: match[4]
      };
    }
  };

  simple = function(string) {
    return {
      location: string
    };
  };

  empty = function(line) {
    return !!line.trim().length;
  };

  parse = function(playlist) {
    var firstNewline;
    firstNewline = playlist.search("\n");
    if (playlist.substr(0, firstNewline) === EXTENDED) {
      return playlist.substr(firstNewline).split("#").filter(empty).map(extended);
    } else {
      return playlist.split("\n").filter(empty).map(simple);
    }
  };

  (typeof module !== "undefined" && module !== null ? module.exports : window).M3U = {
    name: "m3u",
    parse: parse
  };

}).call(this);
