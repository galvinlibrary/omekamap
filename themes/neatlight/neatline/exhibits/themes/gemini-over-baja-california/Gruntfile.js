
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    concat: {
      dist: {
        src: [
          'bower_components/d3/d3.js',
          'bower_components/nprogress/nprogress.js',
          'assets/javascripts/**/*.js'
        ],
        dest: 'script.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'script.js': 'script.js'
        }
      }
    },

    stylus: {
      dist: {
        files: {
          'style.css': 'assets/stylesheets/style.styl'
        }
      },
      options: {
        paths: ['bower_components'],
        'include css': true
      }
    },

    cssmin: {
      dist: {
        files: {
          'style.css': 'style.css'
        }
      }
    },

    watch: {
      dist: {
        files: 'assets/**/*',
        tasks: 'compile:min'
      }
    }

  });

  grunt.registerTask('compile', ['stylus', 'concat']);
  grunt.registerTask('compile:min', ['compile', 'cssmin', 'uglify']);
  grunt.registerTask('default', 'compile:min');

};
