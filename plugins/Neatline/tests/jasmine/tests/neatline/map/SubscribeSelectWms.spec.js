
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Map | Subscribe `select` (WMS Layers)', function() {


  var fixtures = {
    noFocus: readFixtures('NeatlineMapSubscribeSelectWms.noFocus.json'),
    focus:   readFixtures('NeatlineMapSubscribeSelectWms.focus.json')
  };


  beforeEach(function() {
    NL.loadNeatline();
  });


  it('should not focus for model with WMS but no focus', function() {

    // ------------------------------------------------------------------------
    // When a record is selected that has a WMS layer but no default focus or
    // zoom, the map should not focus on the record since the record will have
    // the generic coverage that covers the whole map, which, when focused on,
    // zooms the map out to the highest level.
    // ------------------------------------------------------------------------

    var model = NL.recordFromJson(fixtures.noFocus);

    // Set center and zoom.
    NL.setMapCenter(200, 300, 15);

    // Select record with WMS layer, no focus.
    Neatline.vent.trigger('select', { model: model });

    // Map should not focus.
    NL.assertMapViewport(200, 300, 15);

  });


  it('should focus for model with WMS and focus', function() {

    // ------------------------------------------------------------------------
    // When a record is selected that has a WMS layer and default focus / zoom
    // values, the map should apply the defaults as usual.
    // ------------------------------------------------------------------------

    var model = NL.recordFromJson(fixtures.focus);

    // Set center and zoom.
    NL.setMapCenter(200, 300, 15);

    // Select record with WMS layer and focus.
    Neatline.vent.trigger('select', { model: model });

    // Map should focus.
    NL.assertMapViewport(100, 200, 10);

  });


});
