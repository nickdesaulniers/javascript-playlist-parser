fs = require 'fs'
assert = require 'assert'
should = require('chai').should()

parsers = require '../lib/parser.min.js'
M3U = parsers.M3U
PLS = parsers.PLS
ASX = parsers.ASX

describe 'm3u parsing', ->
  it 'should have a name of m3u', ->
    M3U.name.should.equal 'm3u'

  it 'should return an array', ->
    parsed = M3U.parse ''
    parsed.should.be.an 'array'
    parsed.length.should.be.empty

  describe 'default parsing', ->
    it 'should return an array of objects', ->
      playlist = fs.readFileSync './test/url.m3u', encoding: 'utf8'
      parsed = M3U.parse playlist
      parsed.should.be.an 'array'
      parsed.should.not.be.empty
      parsed.length.should.equal 2

      parsed.forEach (song) ->
        song.should.be.an 'object'
        song.should.have.ownProperty 'file'

      parsed[0].file.should.equal 'http://stream-sd.radioparadise.com:8058'
      parsed[1].file.should.equal 'http://stream-sd.radioparadise.com:8056'

  describe 'extended parsing', ->
    it 'should return an array of objects', ->
      playlist = fs.readFileSync './test/extended.m3u', encoding: 'utf8'
      parsed = M3U.parse playlist
      parsed.length.should.equal 5
      parsed.forEach (song) ->
        song.should.have.ownProperty 'length'
        song.should.have.ownProperty 'artist'
        song.should.have.ownProperty 'title'
        song.should.have.ownProperty 'file'

    describe 'bad extended', ->
      it 'should revert to default parsing from extended parsing', ->
        playlist = fs.readFileSync './test/bad_extended.m3u', encoding: 'utf8'
        parsed = M3U.parse playlist
        parsed.length.should.equal 1
        parsed[0].file.should.equal 'http://radio.4duk.ru:80/4duk40.mp3'

    describe 'negative time', ->
      it 'should still parse', ->
        playlist = fs.readFileSync './test/negative_time.m3u', encoding: 'utf8'
        parsed = M3U.parse playlist
        parsed.length.should.equal 1
        parsed[0].should.be.an 'object'
        parsed[0].should.have.ownProperty 'length'
        parsed[0].length.should.equal '-1'

describe 'pls parsing', ->
  it 'should have a name of pls', ->
    PLS.name.should.equal 'pls'

  it 'should return an array', ->
    parsed = PLS.parse ''
    parsed.should.be.an 'array'
    parsed.length.should.be.empty

  it 'should return an array of objects', ->
    parsed = PLS.parse fs.readFileSync './test/example.pls', encoding: 'utf8'
    parsed.length.should.equal 3
    parsed.forEach (song) ->
      song.should.be.an 'object'
      song.should.have.ownProperty 'file'
      song.should.have.ownProperty 'title'
      song.should.have.ownProperty 'length'

describe 'asx parsing', ->
  describe 'well formed', ->
    it 'should have a name of asx', ->
      ASX.name.should.equal 'asx'

    it 'should return an array', ->
      parsed = ASX.parse ''
      parsed.should.be.an 'array'
      parsed.length.should.be.empty

    it 'should return an array of objects', ->
      parsed = ASX.parse fs.readFileSync './test/example.asx', encoding: 'utf8'
      parsed.length.should.equal 1
      parsed[0].file.should.equal 'http://kexp-mp3-2.cac.washington.edu:8000/'

  describe 'malformed', ->
    it 'should still parse', ->
      playlist = fs.readFileSync './test/malformed.asx', encoding: 'utf8'
      parsed = ASX.parse playlist
      parsed.length.should.equal 2
      parsed[0].file.should.equal 'http://stream.radiotime.com/sample.mp3'
      parsed[1].file.should.equal 'http://kexp-mp3-2.cac.washington.edu:8000/'

    it 'should still parse, for wrong case attributes', ->
      parsed = ASX.parse fs.readFileSync './test/malformed_wrong_case.asx', encoding: 'utf8'
      parsed.length.should.equal 1
      parsed[0].file.should.equal 'http://kexp-mp3-2.cac.washington.edu:8000/'

    it 'should return null, when REF has no attributes', ->
      parsed = ASX.parse fs.readFileSync './test/malformed_no_attributes.asx', encoding: 'utf8'
      parsed.should.be.an 'array'
      parsed.length.should.be.empty
    

