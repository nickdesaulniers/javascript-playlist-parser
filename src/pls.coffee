LISTING_RE = /(file|title|length)(\d+)=(.+)\r?/i

parse = (playlist) ->
  tracks = []
  for line in playlist.trim().split '\n'
    match = line.match LISTING_RE
    if match and match.length is 4
      [_, key, index, value] = match
      tracks[index] = {} unless tracks[index]
      tracks[index][key.toLowerCase()] = value
  tracks.filter (track) -> track?

(if module? then module.exports else window).PLS =
  name: 'pls'
  parse: parse

