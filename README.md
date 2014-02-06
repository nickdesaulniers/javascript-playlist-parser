#javascript-playlist-parser#
Parse m3u, m3u extended, pls, and asx in JavaScript.

##Usage##
###Browser###
Adds `window.M3U.parse`, `window.PLS.parse`, and `window.ASX.parse` which take a
string and return a possibly empty array of objects.

```html
<script src="https://raw.github.com/nickdesaulniers/javascript-playlist-parser/master/lib/parser.min.js"></script>
```

```javascript
// Fetch the playlist file, using xhr for example
var xhr = new XMLHttpRequest();
xhr.open("GET", "my_playlist.m3u");
xhr.overrideMimeType("audio/x-mpegurl"); // Needed, see below.
xhr.onload = parse;
xhr.send();

// Parse it
function parse () {
  var playlist = M3U.parse(this.response);
  var audio = new Audio();
  next(audio, playlist, 0);
};

// Play each song after a song finishes
function next (audio, playlist, i) {
  if (i < playlist.length) {
    audio.src = playlist[i++].file;
    audio.onended = next.bind(null, audio, playlist, i);
    audio.play();
  }
};
```

[Demo](http://nickdesaulniers.github.io/javascript-playlist-parser/)

###Node.js###
Adds `require('playlist-parser').M3U.parse`,
`require('playlist-parser').PLS.parse`,
and `require('playlist-parser').ASX.parse`
which take a string and return
a possibly empty array of objects.

`npm install playlist-parser`
```javascript
var parsers = require("playlist-parser");
var M3U = parsers.M3U;

var fs = require("fs");
var playlist = M3U.parse(fs.readFileSync("my_playlist.m3u", { encoding: "utf8" }));
```
##Return Values##
Calls to parse return an array of objects that look like:

###M3U Simple or ASX###
```javascript
[{
  file: "http://song.com/song.mp3"
}]
```

###M3U Extended###
```javascript
[{
  length: 1234,
  artist: "Iron Maiden",
  title: "Rime of the Ancient Mariner",
  file: "http://song.com/song.mp3"
}]
```

###PLS###
```javascript
[{
  file: "http://song.com/song.mp3",
  title: "My favorite song ever by my favorite artist",
  length: 1234
}]
```

##MIME Types##
* m3u -> audio/x-mpegurl
* pls -> audio/x-scpls
* asx -> video/x-ms-asf

##License##

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
<nick@mozilla.com> wrote this file. As long as you retain this
notice you can do whatever you want with this stuff. If we meet some day,
and you think this stuff is worth it, you can buy me a beer in return.
Nick Desaulniers

