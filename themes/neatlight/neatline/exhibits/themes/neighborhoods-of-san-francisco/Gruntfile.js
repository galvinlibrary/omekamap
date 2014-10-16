
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    uglify: {
      dist: {
        files: {
          'script.js': [
            'assets/javascripts/*.js',
            'bower_components/nprogress/nprogress.js'
          ]
        }
      }
    },

    stylus: {
      dist: {
        files: {
          'style.css': [
            'assets/stylesheets/fonts.styl',
            'bower_components/nprogress/nprogress.css',
            'assets/stylesheets/style.styl'
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
