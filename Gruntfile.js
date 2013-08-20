module.exports = function (grunt) {
  grunt.initConfig({
    coffee: {
      compileJoined: {
        files: {
          "build/parser.js": ["lib/*.coffee"],
        },
      },
    },
    mochaTest: {
      test: {
        options: {
          reporter: "nyan",
        },
        src: ["test/test.coffee"],
      },
    }
  });

  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-mocha-test");

  grunt.registerTask("default", ["coffee", "mochaTest"]);
  grunt.registerTask("test", ["mochaTest"]);
};
