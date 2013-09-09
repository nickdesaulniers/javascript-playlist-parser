window.AudioPlayer = {
  _song: new Audio(),
  _songQueue: [],
  //_proxyServer: 'http://lostoracle.net:3000/?url=',
  _proxyServer: 'http://10.250.21.77:3000/?url=',//
  _MIMETypeMap: {
    m3u: 'audio/x-mpegurl',
    pls: 'audio/audio/x-scpls'
  },
  _unloadSingle: function () {
    // If the user wants to change songs, unload previous song from hardware
    // acceleration.
    if (!!this._song.src) {
      this._song.src = null;
      this._song.play();
    }
  },
  _unloadPlaylist: function () {
    if (this._songQueue.length) {
      this._songQueue.length = 0;
    }
    this._unloadSingle();
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
    this._unloadSingle();

    // If there's more songs to be played, set the onended callback to call this
    // method with the next song in the queue.
    if (this._songQueue.length) {
      this._song.onended = function () {
        this._loadSingle(this._songQueue.shift().file);
      }.bind(this);
    }

    this._song.src = url;
    this._song.play();
  },
  _loadPlaylist: function (url, playlistFormat) {
    this._unloadPlaylist();
    var xhr = new XMLHttpRequest({mozSystem: true});
    xhr.open('GET', this._proxyServer + encodeURIComponent(url));
    xhr.overrideMimeType(this._MIMETypeMap[playlistFormat]);
    xhr.onload = this._parsePlaylist.bind(this, xhr, playlistFormat);
    xhr.send();
  },
  play: function (dataset) {
    if (dataset && dataset.url) {
      if (dataset.playlist) {
        this._loadPlaylist(dataset.url, dataset.playlist.toLowerCase());
      } else {
        this._loadSingle(dataset.url);
      }
    } else if (this._song.paused) {
      // new Audio starts out paused so this conditional branch has to be 2nd
      this._song.play();
    }
  },
  pause: function () {
    if (!this._song.paused) {
      this._song.pause();
    }
  },
  next: function () {
    // With streams it's not possible to seek to "the end"
    if (this._song.seekable.length > 0) {
      this._song.currentTime = this._song.seekable.end(0);
    } else if (this._songQueue.length) {
      this._loadSingle(this._songQueue.shift().file);
    } else {
      this._unloadSingle();
    }
  },
  stop: function () {
    this._unloadPlaylist();
  },
};