
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Zoom', function(Zoom) {


  Zoom.addInitializer(function() {
    React.renderComponent(Zoom.Component(), $('#zoom').get(0));
  });


});
