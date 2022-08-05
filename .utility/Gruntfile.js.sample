/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    mdspell: {
      options: {
        ignoreAcronyms: true,
        ignoreNumbers: true
      },
      files: {
        src: ['docs/**/*.md', '!docs/legacy/**/*.md']
      },
    },
    textlint: {
      src: ["./docs/*"],
      rules: {
        "no-dead-links": true
      }
    },
  });

  grunt.loadNpmTasks('grunt-mdspell');
  grunt.loadNpmTasks('grunt-textlint');

  // Default task.
  grunt.registerTask('default', ['mdspell']);
};