
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Map | Render WMS Opacity', function() {


  var fixtures = {
    records: read('NeatlineMapRenderWmsOpacity.json')
  };


  beforeEach(function() {
    NL.loadNeatline();
  });


  it('should render opacities', function() {

    // ------------------------------------------------------------------------
    // WMS layer opacities should be set from the `fill_opacity` field.
    // ------------------------------------------------------------------------

    NL.respondMap200(fixtures.records);

    // Should set WMS layer opacity.
    expect(NL.v.map.getWmsLayers()[0].opacity).toEqual(0.5);

  });


});
