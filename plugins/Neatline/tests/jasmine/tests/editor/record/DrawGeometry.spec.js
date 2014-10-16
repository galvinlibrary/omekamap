
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Record | Draw Geometry', function() {


  var elements, fixtures = {
    record: read('EditorRecord.record.json')
  };


  beforeEach(function() {

    NL.loadEditor();
    NL.showRecordForm(fixtures.record);
    NL.v.record.activateTab('map');

    elements = {
      pan:      NL.v.record.$('input[value="pan"]'),
      point:    NL.v.record.$('input[value="point"]'),
      line:     NL.v.record.$('input[value="line"]'),
      poly:     NL.v.record.$('input[value="poly"]'),
      svg:      NL.v.record.$('input[value="svg"]'),
      regPoly:  NL.v.record.$('input[value="regPoly"]'),
      modify:   NL.v.record.$('input[value="modify"]'),
      rotate:   NL.v.record.$('input[value="rotate"]'),
      resize:   NL.v.record.$('input[value="resize"]'),
      drag:     NL.v.record.$('input[value="drag"]'),
      remove:   NL.v.record.$('input[value="remove"]'),
      coverage: NL.v.record.$('textarea[name="coverage"]'),
      clear:    NL.v.record.$('a[name="clear"]'),
      parse:    NL.v.record.$('a[name="parse"]')
    };

  });


  it('should set draw point mode', function() {

    // ------------------------------------------------------------------------
    // The "Draw Point" radio should enable point-drawing on the map.
    // ------------------------------------------------------------------------

    // Check "Draw Point".
    elements.point.prop('checked', true).trigger('change');

    // "Draw Point" should be active.
    expect(NL.v.map.controls.point.active).toBeTruthy();

  });


  it('should set draw line mode', function() {

    // ------------------------------------------------------------------------
    // The "Draw Line" radio should enable line-drawing on the map.
    // ------------------------------------------------------------------------

    // Check "Draw Line".
    elements.line.prop('checked', true).trigger('change');

    // "Draw Line" should be active.
    expect(NL.v.map.controls.line.active).toBeTruthy();

  });


  it('should set draw polygon mode', function() {

    // ------------------------------------------------------------------------
    // The "Draw Polygon" radio should enable polygon-drawing on the map.
    // ------------------------------------------------------------------------

    // Check "Draw Polygon".
    elements.poly.prop('checked', true).trigger('change');

    // "Draw Polygon" should be active.
    expect(NL.v.map.controls.poly.active).toBeTruthy();

  });


  it('should set draw SVG mode', function() {

    // ------------------------------------------------------------------------
    // The "Draw SVG" radio should enable SVG-drawing on the map.
    // ------------------------------------------------------------------------

    // Check "Draw SVG".
    elements.svg.prop('checked', true).trigger('change');

    // "Draw SVG" should be active.
    expect(NL.v.map.controls.svg.active).toBeTruthy();

  });


  it('should set draw regular polygon mode', function() {

    // ------------------------------------------------------------------------
    // The "Draw Regular Polygon" radio should enable regular polygon drawing
    // on the map.
    // ------------------------------------------------------------------------

    // Check "Draw Regular Polygon".
    elements.regPoly.prop('checked', true).trigger('change');

    // "Draw Regular Polygon" should be active.
    expect(NL.v.map.controls.regPoly.active).toBeTruthy();

  });


  it('should set sides', function() {

    // ------------------------------------------------------------------------
    // When the value in "Sides" input is changed, the `sides` property on the
    // `modifyFeature` control should be updated.
    // ------------------------------------------------------------------------

    // Set sides.
    NL.v.mapTab.__ui.sides.val('10').trigger('change');

    // "Sides" should be updated.
    expect(NL.v.map.controls.regPoly.handler.sides).toEqual(10);

  });


  it('should block invalid sides', function() {

    // ------------------------------------------------------------------------
    // When a value below 3 or a string is entered into the "Sides" input, the
    // `sides` property should default to 3.
    // ------------------------------------------------------------------------

    // Numbers below 3:
    _.each(_.range(-1, 2), function(v) {
      NL.v.mapTab.__ui.sides.val(v).trigger('change');
      expect(NL.v.map.controls.regPoly.handler.sides).toEqual(3);
    });

    // String:
    NL.v.mapTab.__ui.sides.val('invalid').trigger('change');
    expect(NL.v.map.controls.regPoly.handler.sides).toEqual(3);

  });


  it('should set snap angle', function() {

    // ------------------------------------------------------------------------
    // When the value in "Snap Angle" is changed, the `snapAngle` property on
    // the modifyFeature control should be updated.
    // ------------------------------------------------------------------------

    // Set snap angle.
    NL.v.mapTab.__ui.snap.val('45').trigger('change');

    // "Snap Angle" should be updated.
    expect(NL.v.map.controls.regPoly.handler.snapAngle).toEqual(45);

  });


  it('should block invalid snap angle', function() {

    // ------------------------------------------------------------------------
    // When a negative value or a non-number is entered into the "Snap Angle"
    // input, the `snapAngle` property should default to 0.
    // ------------------------------------------------------------------------

    // Negative number:
    NL.v.mapTab.__ui.snap.val('-1').trigger('change');
    expect(NL.v.map.controls.regPoly.handler.snapAngle).toEqual(0);

    // String:
    NL.v.mapTab.__ui.snap.val('invalid').trigger('change');
    expect(NL.v.map.controls.regPoly.handler.snapAngle).toEqual(0);

  });


  it('should set irregular', function() {

    // ------------------------------------------------------------------------
    // When the "Irregular" checkbox is changed, the `irregular` property on
    // the `modifyFeature` control should be updated.
    // ------------------------------------------------------------------------

    // Set irregular.
    NL.v.mapTab.__ui.irreg.prop('checked', true).trigger('change');

    // "Irregular" be active.
    expect(NL.v.map.controls.regPoly.handler.irregular).toEqual(true);

    // Unset irregular.
    NL.v.mapTab.__ui.irreg.prop('checked', false).trigger('change');

    // "Irregular" should be inactive.
    expect(NL.v.map.controls.regPoly.handler.irregular).toEqual(false);

  });


  it('should set modify shape mode', function() {

    // ------------------------------------------------------------------------
    // When the "Modify Shape" radio button is selected, the corresponding
    // `modifyFeature` control should be activated on the map.
    // ------------------------------------------------------------------------

    // Check "Modify Shape".
    elements.modify.prop('checked', true).trigger('change');

    // Edit control should be active.
    expect(NL.v.map.controls.edit.active).toBeTruthy();

    // Reshape should be active.
    expect(NL.v.map.controls.edit.mode).toEqual(
      OpenLayers.Control.ModifyFeature.RESHAPE
    );

  });


  it('should set rotate shape mode', function() {

    // ------------------------------------------------------------------------
    // When the "Rotate Shape" radio button is selected, the corresponding
    // `modifyFeature` control should be activated on the map.
    // ------------------------------------------------------------------------

    // Check "Rotate Shape".
    elements.rotate.prop('checked', true).trigger('change');

    // Edit control should be active.
    expect(NL.v.map.controls.edit.active).toBeTruthy();

    // Rotate should be active.
    expect(NL.v.map.controls.edit.mode).toEqual(
      OpenLayers.Control.ModifyFeature.ROTATE
    );

  });


  it('should set resize shape mode', function() {

    // ------------------------------------------------------------------------
    // When the "Resize Shape" radio button is selected, the corresponding
    // `modifyFeature` control should be activated on the map.
    // ------------------------------------------------------------------------

    // Check "Resize Shape".
    elements.resize.prop('checked', true).trigger('change');

    // Edit control should be active.
    expect(NL.v.map.controls.edit.active).toBeTruthy();

    // Resize should be active.
    expect(NL.v.map.controls.edit.mode).toEqual(
      OpenLayers.Control.ModifyFeature.RESIZE
    );

  });


  it('should set drag shape mode', function() {

    // ------------------------------------------------------------------------
    // When the "Drag Shape" radio button is selected, the corresponding
    // `modifyFeature` control should be activated on the map.
    // ------------------------------------------------------------------------

    // Check "Drag Shape".
    elements.drag.prop('checked', true).trigger('change');

    // Edit control should be active.
    expect(NL.v.map.controls.edit.active).toBeTruthy();

    // Resize should be active.
    expect(NL.v.map.controls.edit.mode).toEqual(
      OpenLayers.Control.ModifyFeature.DRAG
    );

  });


  it('should set delete shape mode', function() {

    // ------------------------------------------------------------------------
    // When the "Delete Shape" radio button is selected, the corresponding
    // `modifyFeature` control should be activated on the map.
    // ------------------------------------------------------------------------

    // Check "Delete Shape".
    elements.remove.prop('checked', true).trigger('change');

    // "Delete Shape" should be active.
    expect(NL.v.map.controls.remove.active).toBeTruthy();

  });


  it('should update coverage on point add', function() {

    // ------------------------------------------------------------------------
    // When a new point is added to the map, the coverage text area should be
    // updated with the new WKT string.
    // ------------------------------------------------------------------------

    // Add a point.
    var pt = new OpenLayers.Geometry.Point(3,4);
    NL.v.map.controls.point.drawFeature(pt);

    // "Coverage" should be updated.
    expect(elements.coverage.val()).toEqual(
      'GEOMETRYCOLLECTION(POINT(1 2),POINT(3 4))'
    );

  });


  it('should update coverage on line add', function() {

    // ------------------------------------------------------------------------
    // When a new line is added to the map, the coverage text area should be
    // updated with the new WKT string.
    // ------------------------------------------------------------------------

    // Add line.
    var pt1   = new OpenLayers.Geometry.Point(3,4);
    var pt2   = new OpenLayers.Geometry.Point(5,6);
    var line  = new OpenLayers.Geometry.LineString([pt1,pt2]);
    NL.v.map.controls.line.drawFeature(line);

    // "Coverage" should be updated.
    expect(elements.coverage.val()).toEqual(
      'GEOMETRYCOLLECTION(POINT(1 2),LINESTRING(3 4,5 6))'
    );

  });


  it('should update coverage on polygon add', function() {

    // ------------------------------------------------------------------------
    // When a new polygon is added to the map, the coverage text area should
    // be updated with the new WKT string.
    // ------------------------------------------------------------------------

    // Add a polygon.
    var pt1   = new OpenLayers.Geometry.Point(3,4);
    var pt2   = new OpenLayers.Geometry.Point(5,6);
    var pt3   = new OpenLayers.Geometry.Point(7,8);
    var ring  = new OpenLayers.Geometry.LinearRing([pt1,pt2,pt3]);
    var poly  = new OpenLayers.Geometry.Polygon([ring]);
    NL.v.map.controls.poly.drawFeature(poly);

    // "Coverage" should be updated.
    expect(elements.coverage.val()).toEqual(
      'GEOMETRYCOLLECTION(POINT(1 2),POLYGON((3 4,5 6,7 8,3 4)))'
    );

  });


  it('should update coverage on svg add', function() {

    // ------------------------------------------------------------------------
    // When a new SVG-backed geometry collection is added to the map, the
    // coverage text area should be updated with the new WKT string.
    // ------------------------------------------------------------------------

    // Add a geometry collection.
    var pt1 = new OpenLayers.Geometry.Point(3,4);
    var pt2 = new OpenLayers.Geometry.Point(5,6);
    var collection = new OpenLayers.Geometry.Collection([pt1, pt2]);
    NL.v.map.controls.svg.drawFeature(collection);

    // "Coverage" should be updated.
    expect(elements.coverage.val()).toEqual(
      'GEOMETRYCOLLECTION(POINT(1 2),POINT(3 4),POINT(5 6))'
    );

  });


  it('should update coverage on svg polygon add', function() {

    // ------------------------------------------------------------------------
    // When a new SVG-backed polygon is added to the map, the coverage text
    // area should be updated with the new WKT string.
    // ------------------------------------------------------------------------

    // Add a polygon.
    var pt1   = new OpenLayers.Geometry.Point(1,2);
    var pt2   = new OpenLayers.Geometry.Point(3,4);
    var pt3   = new OpenLayers.Geometry.Point(5,6);
    var ring  = new OpenLayers.Geometry.LinearRing([pt1,pt2,pt3]);
    var poly  = new OpenLayers.Geometry.Polygon([ring]);
    NL.v.map.controls.svg.drawFeature(poly);

    // "Coverage" should be updated.
    expect(elements.coverage.val()).toEqual(
      'GEOMETRYCOLLECTION(POINT(1 2),POLYGON((1 2,3 4,5 6,1 2)))'
    );

  });


  it('should update coverage on regular polygon add', function() {

    // ------------------------------------------------------------------------
    // When a new regular polygon is added to the map, the coverage text area
    // should be updated with the new WKT string.
    // ------------------------------------------------------------------------

    // Add a polygon.
    var pt1   = new OpenLayers.Geometry.Point(1,2);
    var pt2   = new OpenLayers.Geometry.Point(3,4);
    var pt3   = new OpenLayers.Geometry.Point(5,6);
    var ring  = new OpenLayers.Geometry.LinearRing([pt1,pt2,pt3]);
    var poly  = new OpenLayers.Geometry.Polygon([ring]);
    NL.v.map.controls.regPoly.drawFeature(poly);

    // "Coverage" should be updated.
    expect(elements.coverage.val()).toEqual(
      'GEOMETRYCOLLECTION(POINT(1 2),POLYGON((1 2,3 4,5 6,1 2)))'
    );

  });


  it('should update coverage on feature edit', function() {

    // ------------------------------------------------------------------------
    // When an existing geometry is edited, the coverage text area should be
    // updated with the new WKT string.
    // ------------------------------------------------------------------------

    // Edit feature, set new point coords.
    var feature = NL.v.map.editLayer.features[0];
    NL.v.map.controls.edit.selectFeature(feature);
    feature.geometry.x = 2;
    feature.geometry.y = 3;

    // Trigger modification.
    NL.v.map.controls.edit.dragComplete();

    // "Coverage" should be updated.
    expect(elements.coverage.val()).toEqual(
      'GEOMETRYCOLLECTION(POINT(2 3))'
    );

  });


  it('should update coverage on feature delete', function() {

    // ------------------------------------------------------------------------
    // When an existing geometry is deleted, the coverage text area should be
    // updated with the new WKT string.
    // ------------------------------------------------------------------------

    // Edit feature, set new point coords.
    var feature = NL.v.map.editLayer.features[0];

    // Trigger modification.
    NL.v.map.controls.remove.selectFeature(feature);

    // "Coverage" should be updated.
    expect(elements.coverage.val()).toEqual('');

  });


  it('should not save sketch geometry', function() {

    // ------------------------------------------------------------------------
    // When geometry modified, the drag handle points added to the feature
    // should not be saved as part of the coverage.
    // ------------------------------------------------------------------------

    // Add a new line.
    var pt1   = new OpenLayers.Geometry.Point(3,4);
    var pt2   = new OpenLayers.Geometry.Point(5,6);
    var line  = new OpenLayers.Geometry.LineString([pt1,pt2]);
    NL.v.map.controls.line.drawFeature(line);

    // Select line, triger modify.
    var feature = NL.v.map.editLayer.features[1];
    NL.v.map.controls.edit.selectFeature(feature);
    NL.v.map.controls.edit.dragComplete();

    // "Coverage" should be updated.
    expect(elements.coverage.val()).toEqual(
      'GEOMETRYCOLLECTION(POINT(1 2),LINESTRING(3 4,5 6))'
    );

  });


  it('should remove all features when geometry is cleared', function() {

    // ------------------------------------------------------------------------
    // When the "Clear all Geometry" button is clicked, all features on the
    // edit layer should be deleted.
    // ------------------------------------------------------------------------

    // Click "Clear all Geometry".
    elements.clear.trigger('click');

    // All features should be removed.
    expect(NL.v.map.editLayer.features.length).toEqual(0);

    // "Coverage" should be updated.
    expect(elements.coverage.val()).toEqual('');

  });


  it('should revert to "Navigate" mode when tab is closed', function() {

    // ------------------------------------------------------------------------
    // The geometry editing controls should revert to "Navigate" mode when the
    // spatial tab is deactivated.
    // ------------------------------------------------------------------------

    // Activate "Draw Polygon".
    elements.poly.prop('checked', true).trigger('change');

    // Activate "Text" tab.
    NL.v.record.activateTab('text');

    // "Navigate" mode should be active.
    expect(NL.v.mapTab.getEditMode()).toEqual('pan');

  });


});
