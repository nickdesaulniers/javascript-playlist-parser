window.AudioPlayer = {
  _song: new Audio(),
  _songQueue: [],
  //_proxyServer: 'http://lostoracle.net:3000/?url=',
  _proxyServer: 'http://10.250.21.77:3000/?url=',//
  _MIMETypeMap: {
    m3u: 'audio/x-mpegurl',
    pls: 'audio/audio/x-scpls'
  },
  _unload: function () {
    // If the user wants to change songs, unload previous song from hardware
    // acceleration.
    if (!!this._song.src) {
      this._song.src = null;
      this._song.play();
    }
  },
  _parsePlaylist: function (xhr, playlistFormat) {
    var playlist = null;
    if (playlistFormat === 'm3u') {
      playlist = M3U.parse(xhr.responseText);
    } else if (playlistFormat === 'pls') {
      playlist = PLS.parse(xhr.responseText);
    }
    if (playlist) {
      this._songQueue = this._songQueue.concat(playlist);
      this._loadSingle(this._songQueue.shift().file);
    } else {
      console.error('Failed to parse playlist: ' + xhr.responseText);
    }
  },
  _loadSingle: function (url) {
    this._unload();

    // If there's more songs to be played, set the onended callback to call this
    // method with the next song in the queue.
    if (this._songQueue.length) {
      this._song.onended = this._loadSingle.bind(this, this._songQueue.shift());
    }

    this._song.src = url;
    this._song.play();
  },
  _loadPlaylist: function (url, playlistFormat) {
    var xhr = new XMLHttpRequest({mozSystem: true});
    xhr.open('GET', this._proxyServer + encodeURIComponent(url));
    xhr.overrideMimeType(this._MIMETypeMap[playlistFormat]);
    xhr.onload = this._parsePlaylist.bind(this, xhr, playlistFormat);
    xhr.send();
  },
  play: function (dataset) {
    if (this._song.paused) {
      this._song.play();
    } else if (dataset && dataset.url) {
      if (dataset.playlist) {
        this._loadPlaylist(dataset.url, dataset.playlist.toLowerCase());
      } else {
        this._loadSingle(dataset.url);
      }
    }
  },
  pause: function () {
    if (!this._song.paused) {
      this._song.pause();
    }
  },
  next: function () {
    // Issue: so with streams it's not possible to seek to "the end"
    try {
      alert(this._song.seekable.length);
      //alert(this._song.seekable.end(0));
      //this._song.currentTime = this._song.seekable.end(0);
    } catch (e) {
      alert(e);
    }
  },
};