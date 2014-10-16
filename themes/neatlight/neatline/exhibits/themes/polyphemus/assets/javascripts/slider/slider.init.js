
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Slider', function(Slider) {


  Slider.addInitializer(function() {
    Slider.__controller = new Neatline.Slider.Controller();
  });


});
