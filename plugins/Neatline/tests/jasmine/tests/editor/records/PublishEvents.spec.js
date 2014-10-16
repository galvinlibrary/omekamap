
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Records | Publish Events', function() {


  var model, row, vent, fixtures = {
    records: read('EditorRecordsPublishEvents.json')
  };


  beforeEach(function() {

    NL.loadEditor();
    NL.respondRecordList200(fixtures.records);

    // Get the first model and row.
    model = NL.getRecordListModelAtIndex(0);
    row = NL.getRecordListRows()[0];

    // Spy on trigger.
    vent = NL.getEventSpy();

  });


  it('should publish `highlight` on row mouseenter', function() {

    // ------------------------------------------------------------------------
    // When the cursor hovers on a record row, the `highlight` event should be
    // published with the row's model.
    // ------------------------------------------------------------------------

    $(row).trigger('mouseenter');

    expect(vent).toHaveBeenCalledWith('highlight', {
      model: model, source: 'EDITOR:EXHIBIT:RECORDS'
    });

  });


  it('should publish `unhighlight` on row mouseleave', function() {

    // ------------------------------------------------------------------------
    // When the cursor leaves a record row, the `unhighlight` event should be
    // published with the row's model.
    // ------------------------------------------------------------------------

    $(row).trigger('mouseenter');
    $(row).trigger('mouseleave');

    expect(vent).toHaveBeenCalledWith('unhighlight', {
      model: model, source: 'EDITOR:EXHIBIT:RECORDS'
    });

  });


  it('should publish `select` on row click', function() {

    // ------------------------------------------------------------------------
    // When a record row is clicked, the `select` event should be published
    // with the row's model.
    // ------------------------------------------------------------------------

    $(row).trigger('click');

    expect(vent).toHaveBeenCalledWith('select', {
      model: model, source: 'EDITOR:EXHIBIT:RECORDS'
    });

  });


});
