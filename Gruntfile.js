'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    'jshint': {
      'options': { 'jshintrc': '.jshintrc' },
      'all': [
        'Gruntfile.js',
        'app/js/*.js',
        'test/e2e/*.js',
        'test/unit/*.js'
      ]
    },
    'karma': {
      'unit': {
        'options': {
          'configFile': 'test/karma.conf.js',
          'runnerPort': 9999,
          'singleRun': true,
          'browsers': ['PhantomJS']
        }
      }
    },
    'protractor': {
      'e2e': {
        'configFile': 'test/protractor-conf.js',
        'keepAlive': false,
        'noColor': false,
        'args': {
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('run-tests', 'Run test suite', ['karma:unit', 'protractor', 'jshint']);
};
