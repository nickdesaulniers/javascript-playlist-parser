module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      compile:
        files:
          "lib/parser.js": ["src/*.coffee"]
    mochaTest:
      test:
        options:
          reporter: "nyan"
        src: ["test/test.coffee"]

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-mocha-test"

  grunt.registerTask "default", ["coffee", "mochaTest"]
  grunt.registerTask "test", ["coffee", "mochaTest"]

