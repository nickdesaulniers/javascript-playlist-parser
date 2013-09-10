/*
This software is dual licensed under the MIT and Beerware license.

The MIT License (MIT)

Copyright (c) 2013 Nick Desaulniers

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

"THE BEER-WARE LICENSE" (Revision 42):
 <ndesaulniers@mozilla.com> wrote this file. As long as you retain this
 notice you can do whatever you want with this stuff. If we meet some day,
 and you think this stuff is worth it, you can buy me a beer in return.
 Nick Desaulniers
*/


(function() {


}).call(this);

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
