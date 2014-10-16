
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.on('start', function() {

  var map = Neatline.request('MAP:getMap');

  $('.btn.in').click(function() {
    map.zoomIn();
  });

  $('.btn.out').click(function() {
    map.zoomOut();
  });

});
