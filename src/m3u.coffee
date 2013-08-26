# http://gonze.com/playlists/playlist-format-survey.html#M3U

EXTENDED = "#EXTM3U"
COMMENT_RE = /:(\d+),(.+)\s*-\s*(.+)\n(.+)/

# #EXTINF:822,Iron Maiden - Rime of the Ancient Mariner
extended = (line) ->
  match = line.match COMMENT_RE
  if match && match.length is 5
    length: match[1]
    artist: match[2]
    title: match[3]
    file: match[4]

simple = (string) ->
  file: string

empty = (line) ->
  !!line.trim().length

parse = (playlist) ->
  firstNewline = playlist.search "\n"
  if playlist.substr(0, firstNewline) is EXTENDED
    playlist.substr(firstNewline).split("#").filter(empty).map extended
  else
    playlist.split("\n").filter(empty).map simple

(if module? then module.exports else window).M3U =
  name: "m3u"
  parse: parse

