fs = require "fs"
assert = require "assert"
should = require("chai").should()

parsers = require "../lib/parser.js"
M3U = parsers.M3U

describe "m3u parsing", ->
  it "should have a name of m3u", ->
    M3U.name.should.equal "m3u"

  it "should return an array", ->
    parsed = M3U.parse ""
    parsed.should.be.an "array"
    parsed.length.should.be.empty

  describe "default parsing", ->
    it "should return an array of objects", ->
      playlist = fs.readFileSync "./test/url.m3u", encoding: "utf8"
      parsed = M3U.parse playlist
      parsed.should.be.an "array"
      parsed.should.not.be.empty
      parsed.length.should.equal 2

      parsed.forEach (song) ->
        song.should.be.an "object"
        song.should.have.ownProperty "location"

      parsed[0].location.should.equal "http://stream-sd.radioparadise.com:8058"
      parsed[1].location.should.equal "http://stream-sd.radioparadise.com:8056"

  describe "extended parsing", ->
    it "should return an array of objects", ->
      playlist = fs.readFileSync "./test/extended.m3u", encoding: "utf8"
      parsed = M3U.parse playlist
      parsed.length.should.equal 5
      parsed.forEach (song) ->
        song.should.have.ownProperty "duration"
        song.should.have.ownProperty "artist"
        song.should.have.ownProperty "title"
        song.should.have.ownProperty "location"

