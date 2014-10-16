
/**
 * @package     omeka
 * @subpackage  neatline-Neatlight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = {

  options: {
    livereload: true
  },

  dist: {
    files: [
      'assets/**/*',
      'partials/*.php',
      '*.php'
    ],
    tasks: 'compile:min'
  }

};
