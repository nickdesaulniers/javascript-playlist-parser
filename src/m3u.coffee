# http://gonze.com/playlists/playlist-format-survey.html#M3U

EXTENDED = '#EXTM3U'
COMMENT_RE = /:(?:(-?\d+),(.+)\s*-\s*(.+)|(.+))\n(.+)/

# #EXTINF:822,Iron Maiden - Rime of the Ancient Mariner
extended = (line) ->
  match = line.match COMMENT_RE
  if match and match.length is 6
    length: match[1] or 0
    artist: match[2] or ''
    title: match[4] or match[3]
    file: match[5].trim()

simple = (string) ->
  file: string.trim()

empty = (line) ->
  !!line.trim().length

comments = (line) ->
  line[0] isnt '#'

parse = (playlist) ->
  playlist = playlist.replace /\r/g, ''
  firstNewline = playlist.search '\n'
  if playlist.substr(0, firstNewline) is EXTENDED
    playlist.substr(firstNewline).split('\n#').filter(empty).map extended
  else
    playlist.split('\n').filter(empty).filter(comments).map simple

(if module? then module.exports else window).M3U =
  name: 'm3u'
  parse: parse

