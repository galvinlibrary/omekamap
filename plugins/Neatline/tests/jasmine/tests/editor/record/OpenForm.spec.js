
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Record | Open Form', function() {


  var feature1, feature2, fixtures = {
    records: read('EditorRecordOpenForm.records.json'),
    record:  read('EditorRecord.record.json')
  };


  beforeEach(function() {

    NL.loadEditor();
    NL.respondAll200(fixtures.records);

    feature1 = NL.v.map.getVectorLayers()[0].features[0];
    feature2 = NL.v.map.getVectorLayers()[1].features[0];

  });


  describe('model binding', function() {

    var model;

    afterEach(function() {

      // The form should be displayed and populated with data.
      expect(NL.v.editor.__ui.editor).toContainHtml(NL.v.record.$el);
      expect(NL.v.record.model.id).toEqual(model.id);

    });

    it('when a record row is clicked', function() {

      // ----------------------------------------------------------------------
      // When a row in the records list is clicked, the existing model should
      // be bound to the form immediately.
      // ----------------------------------------------------------------------

      model = NL.getRecordListModelAtIndex(0);

      // Click on a record listing.
      NL.click($(NL.getRecordListRows()[0]));

    });

    it('when a loaded record is requested by a route', function() {

      // ----------------------------------------------------------------------
      // When a record loaded into the browser list is requested by a route,
      // the existing model should be bound to the form immediately.
      // ----------------------------------------------------------------------

      model = NL.getRecordListModelAtIndex(0);

      // Request an already-loaded record.
      NL.navigate('record/'+model.id);

    });

    it('when an unloaded record is requested by a route', function() {

      // ----------------------------------------------------------------------
      // When a record that has _not_ already been loaded into the browser is
      // requested by a route, the record should be loaded from the server.
      // ----------------------------------------------------------------------

      model = NL.recordFromJson(fixtures.record);

      // Request unloaded record.
      NL.navigate('record/999');

      // Respond to the GET request.
      NL.respondLast200(fixtures.record);

    });

    it('when a map feature is clicked', function() {

      // ----------------------------------------------------------------------
      // When a map feature is clicked, the feature's parent model should be
      // bound to the form immediately.
      // ----------------------------------------------------------------------

      model = NL.v.map.getVectorLayers()[0].neatline.model;

      // Click on map feature.
      NL.clickOnMapFeature(feature1);

    });

    it('when a record is selected', function() {

      // ----------------------------------------------------------------------
      // When the `select` event is triggered (for example, but a click on a
      // map feature), the model should be bound to the form.
      // ----------------------------------------------------------------------

      model = NL.v.map.getVectorLayers()[0].neatline.model;

      // Select the model.
      Neatline.vent.trigger('select', { model: model });

    });

  });


  it('should populate form values', function() {

    // ------------------------------------------------------------------------
    // When a record edit form is opened, the inputs should be populated with
    // data from the record model.
    // ------------------------------------------------------------------------

    NL.showRecordForm(fixtures.record);

    var id = JSON.parse(fixtures.record).id;
    var inputs = NL.getRecordFormElements();

    expect(inputs.id).                  toHaveText('#'+id+':'),
    expect(inputs.titleHeader).         toHaveText('title');
    expect(inputs.slug).                toHaveValue('slug');
    expect(inputs.titleInput).          toHaveValue('title');
    expect(inputs.body).                toHaveValue('body');
    expect(inputs.coverage).            toHaveValue('POINT(1 2)');
    expect(inputs.tags).                toHaveValue('tags');
    expect(inputs.widgets.val()).       toEqual(['Widget1','Widget3']);
    expect(inputs.presenter).           toHaveValue('Presenter2');
    expect(inputs.fillColor).           toHaveValue('#111111');
    expect(inputs.fillColorSelect).     toHaveValue('#222222');
    expect(inputs.strokeColor).         toHaveValue('#333333');
    expect(inputs.strokeColorSelect).   toHaveValue('#444444');
    expect(inputs.fillOpacity).         toHaveValue('0.5');
    expect(inputs.fillOpacitySelect).   toHaveValue('0.6');
    expect(inputs.strokeOpacity).       toHaveValue('0.7');
    expect(inputs.strokeOpacitySelect). toHaveValue('0.8');
    expect(inputs.strokeWidth).         toHaveValue('9');
    expect(inputs.pointRadius).         toHaveValue('10');
    expect(inputs.zindex).              toHaveValue('11');
    expect(inputs.weight).              toHaveValue('12');
    expect(inputs.startDate).           toHaveValue('13');
    expect(inputs.endDate).             toHaveValue('14');
    expect(inputs.afterDate).           toHaveValue('15');
    expect(inputs.beforeDate).          toHaveValue('16');
    expect(inputs.pointImage).          toHaveValue('17');
    expect(inputs.wmsAddress).          toHaveValue('18');
    expect(inputs.wmsLayers).           toHaveValue('19');
    expect(inputs.minZoom).             toHaveValue('20');
    expect(inputs.maxZoom).             toHaveValue('21');
    expect(inputs.mapFocus).            toHaveValue('22');
    expect(inputs.mapZoom).             toHaveValue('23');

  });


  it('should populate empty `widgets` value', function() {

    // ------------------------------------------------------------------------
    // When a record with a NULL `widgets` value is bound to the form, all
    // options in the "Widgets" select should be toggled off.
    // ------------------------------------------------------------------------

    // Open first record.
    NL.navigate('record/'+NL.getRecordListModelAtIndex(0).id);

    // Null out `widgets` field.
    NL.getRecordListModelAtIndex(1).set('widgets', null);

    // Open the form, get elements.
    NL.navigate('record/'+NL.getRecordListModelAtIndex(1).id);
    var inputs = NL.getRecordFormElements();

    // All widgets should be deselected.
    expect(inputs.widgets.val()).toBeNull();

  });


  it('should not change form model in response to map click', function() {

    // ------------------------------------------------------------------------
    // When an edit form is already open, clicking on a feature that belongs
    // to a different model from the one bound to the form should not open the
    // new form. This makes it impossible to accidentally switch to another
    // edit form by clicking on a feature that belongs to a different record
    // while drawing shapes in close proximity to other vectors.
    // ------------------------------------------------------------------------

    // Trigger click on Record 1 feature.
    NL.clickOnMapFeature(feature1);

    // Record form should be displayed.
    expect(NL.v.editor.__ui.editor).toContainHtml(NL.v.record.$el);
    expect(NL.v.record.model.get('title')).toEqual('title1');

    // Trigger click on Record 2 feature.
    NL.clickOnMapFeature(feature2);

    // Form should not display new model.
    expect(NL.v.record.model.get('title')).toEqual('title1');

  });


  it('should focus map when the form is opened via editor', function() {

    // ------------------------------------------------------------------------
    // When the edit form is opened in response to a click on a listing in the
    // record browser, the map should focus on the record.
    // ------------------------------------------------------------------------

    // Set center and zoom.
    NL.setMapCenter(200, 300, 15);

    // Open form.
    NL.click($(NL.getRecordListRows()[1]));

    // Should focus on record.
    NL.assertMapViewport(100, 200, 10);

  });


});
