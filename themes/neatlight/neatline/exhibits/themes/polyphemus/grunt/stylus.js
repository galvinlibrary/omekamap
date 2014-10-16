
/**
 * @package     omeka
 * @subpackage  neatline-Neatlight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = {

  options: {
    paths: ['bower_components'],
    'include css': true
  },

  dist: {
    files: {
      'style.css': ['assets/stylesheets/style.styl']
    }
  }

};
