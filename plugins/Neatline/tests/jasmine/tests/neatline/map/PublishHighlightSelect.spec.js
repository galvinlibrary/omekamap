
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Map | Publish `(un)highlight` and `(un)select`', function() {


  var layer, feature, vent, fixtures = {
    records: readFixtures('NeatlineMapPublishHighlightSelect.json')
  };


  beforeEach(function() {

    NL.loadNeatline();
    NL.respondMap200(fixtures.records);

    // Get layer and feature.
    layer = NL.v.map.getVectorLayers()[0];
    feature = layer.features[0];

    // Spy on the event aggregator.
    vent = spyOn(Neatline.vent, 'trigger');

  });


  it('should publish `highlight` on feature highlight', function() {

    // ------------------------------------------------------------------------
    // When the cursor hovers on a feature, the `highlight` event should be
    // published with the feature's model.
    // ------------------------------------------------------------------------

    NL.hoverOnMapFeature(feature);

    expect(vent).toHaveBeenCalledWith('highlight', {
      model: layer.neatline.model, source: 'MAP'
    });

  });


  it('should publish `unhighlight` on feature unhighlight', function() {

    // ------------------------------------------------------------------------
    // When the cursor leaves a feature, the `unhighlight` event should be
    // published with the feature's model.
    // ------------------------------------------------------------------------

    NL.hoverOnMapFeature(feature);
    NL.unHoverOnMapFeature();

    expect(vent).toHaveBeenCalledWith('unhighlight', {
      model: layer.neatline.model, source: 'MAP'
    });

  });


  it('should publish `select` on feature select', function() {

    // ------------------------------------------------------------------------
    // When a feature is clicked, the `select` event should be published with
    // the feature's model.
    // ------------------------------------------------------------------------

    NL.clickOnMapFeature(feature);

    expect(vent).toHaveBeenCalledWith('select', {
      model: layer.neatline.model, source: 'MAP'
    });

  });


  it('should publish `unselect` on feature unselect', function() {

    // ------------------------------------------------------------------------
    // When a feature is unselected by a click elsewhere on the map, the
    // `unselect` event should be published with the feature's model.
    // ------------------------------------------------------------------------

    NL.clickOnMapFeature(feature);
    NL.clickOffMapFeature();

    expect(vent).toHaveBeenCalledWith('unselect', {
      model: layer.neatline.model, source: 'MAP'
    });

  });


});
