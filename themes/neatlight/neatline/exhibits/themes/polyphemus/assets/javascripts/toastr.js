
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

$(function() {

  Neatline.vent.on('MAP:ingest', function() {
    toastr.info(
      '<i class="fa fa-arrow-circle-left fa-lg"></i> ' +
      '<i class="fa fa-arrow-circle-right fa-lg"></i> ' +
      '<span class="text">Scroll with the arrow keys.</span>'
    );
  });

});
