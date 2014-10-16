
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.on('start', function() {

  // Set the exhibit height:

  var map = $('#neatline-map');
  var position = function() {
    map.outerHeight($(window).height());
    Neatline.execute('MAP:updateSize');
  };

  $(window).resize(position);
  position();

  // Fix the narrative width:

  var text = $('div.narrative');
  text.width(text.width());

});
