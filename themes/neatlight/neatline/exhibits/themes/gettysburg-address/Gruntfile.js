
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    copy: {
      boxer: {
        files: [{
          src: [
            'bower_components/Boxer/*.png',
            'bower_components/Boxer/*.gif'
          ],
          expand: true,
          flatten: true,
          dest: './'
        }]
      }
    },

    concat: {
      dist: {
        src: [
          'bower_components/d3/d3.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'bower_components/nprogress/nprogress.js',
          'bower_components/scrollspy/jquery-scrollspy.js',
          'bower_components/Boxer/jquery.fs.boxer.js',
          'assets/javascripts/**/*.js'
        ],
        dest: 'script.js'
      }
    },

    uglify: {
      dist: {
        src: '<%= concat.dist.src %>',
        dest: '<%= concat.dist.dest %>'
      }
    },

    stylus: {
      dist: {
        files: {
          'style.css': 'assets/stylesheets/*.styl'
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

  grunt.registerTask('compile', ['copy', 'stylus', 'cssmin', 'concat']);
  grunt.registerTask('compile:min', ['copy', 'stylus', 'cssmin', 'uglify']);
  grunt.registerTask('default', 'compile:min');

};
