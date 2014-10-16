
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = {

  dist: {
    dest: 'script.js',
    src: [
      'bower_components/nprogress/nprogress.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/vis/dist/vis.js',
      'assets/javascripts/**/*.js'
    ]
  }

};
