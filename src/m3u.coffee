# http://gonze.com/playlists/playlist-format-survey.html#M3U

EXTENDED = "#EXTM3U"
COMMENT_RE = /:(.+),(.+)-(.+)\n(.+)/

# #EXTINF:822,Iron Maiden - Rime of the Ancient Mariner
extended = (line) ->
  match = line.match COMMENT_RE
  if match && match.length is 5
    duration: match[1]
    artist: match[2]
    title: match[3]
    location: match[4]

empty = (line) ->
  !!line.trim().length

toSong = (string) ->
  location: string

parse = (playlist) ->
  firstNewline = playlist.search "\n"
  if  playlist.substr(0, firstNewline) is EXTENDED
    playlist.substr(firstNewline).split("#").filter(empty).map extended
  else
    playlist.split("\n").filter(empty).map toSong

if  module and module.exports
  module.exports.M3U =
    name: "m3u"
    parse: parse

