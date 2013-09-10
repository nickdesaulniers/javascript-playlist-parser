license = require('fs').readFileSync './LICENSE', encoding: 'utf8'

module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      compile:
        files:
          'lib/parser.js': ['src/*.coffee']
    mochaTest:
      test:
        options:
          reporter: 'nyan'
        src: ['test/test.coffee']
    uglify:
      options:
        banner: "/*\n#{license}\n*/\n"
      target:
        files:
          'lib/parser.min.js': ['lib/parser.js']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-mocha-test'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.registerTask 'default', ['coffee', 'uglify','mochaTest']
  grunt.registerTask 'test', ['coffee', 'uglify', 'mochaTest']

