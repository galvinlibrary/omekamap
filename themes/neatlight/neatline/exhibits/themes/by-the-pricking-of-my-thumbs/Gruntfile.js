
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    bower: {
      install: {
        options: {
          copy: false
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'script.js': [
            'assets/js/*.js',
            'bower_components/nprogress/nprogress.js'
          ]
        }
      }
    },

    stylus: {
      dist: {
        files: {
          'style.css': [
            'assets/styl/*.styl',
            'bower_components/nprogress/nprogress.css'
          ]
        }
      }
    },

    watch: {
      dist: {
        files: ['assets/**/*'],
        tasks: ['stylus', 'uglify']
      }
    }

  });

};
