
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Styles | Save Styles', function() {


  var elements, fixtures = {
    exhibit: read('EditorStyles.json')
  };


  beforeEach(function() {

    NL.loadEditor();
    NL.showStyles(fixtures.exhibit);

    elements = {
      setFocus: NL.v.styles.$('a[name="set-focus"]'),
      save:     NL.v.styles.$('a[name="save"]')
    };

  });


  it('should synchronize model with stylesheet editor', function() {

    // ------------------------------------------------------------------------
    // When the stylesheet is changed, the model should be updated with a JSON
    // representation of the CSS.
    // ------------------------------------------------------------------------

    NL.v.styles.styles.getSession().setValue('val');
    expect(NL.v.styles.model.get('styles')).toEqual('val');

  });


  it('should issue PUT request when "Save" is clicked', function() {

    // ------------------------------------------------------------------------
    // When the "Save" button is clicked, a well-formed PUT request should be
    // issued to the exhibit API with the new data.
    // ------------------------------------------------------------------------

    NL.v.styles.styles.getSession().setValue('1');
    NL.v.styles.__ui.mapFocus.val('2').trigger('change');
    NL.v.styles.__ui.mapZoom.val('3').trigger('change');

    // Click "Save" button.
    elements.save.trigger('click');

    // Route should be /neatline/put/:id, method PUT.
    NL.assertLastRequestRoute(Neatline.g.neatline.exhibit_api);
    NL.assertLastRequestMethod('PUT');

    // Check query string values.
    var params = NL.getLastRequestParams();
    expect(params.styles).toEqual('1');
    expect(params.map_focus).toEqual('2');
    expect(params.map_zoom).toEqual('3');

  });


  it('should flash a notification when the save succeeds', function() {

    // ------------------------------------------------------------------------
    // When the "Save" button is clicked and the request succeeds, a success
    // notification should be displayed.
    // ------------------------------------------------------------------------

    // Spy on toaster.
    spyOn(toastr, 'info');

    // Click on "Save".
    elements.save.trigger('click');
    NL.respondLast200(fixtures.exhibit);

    // Should flash success.
    expect(toastr.info).toHaveBeenCalledWith(
      Neatline.g.neatline.strings.exhibit.save.success
    );

  });


  it('should flash a notification when the save fails', function() {

    // ------------------------------------------------------------------------
    // When the "Save" button is clicked and the request fails, a failure
    // notification should be displayed.
    // ------------------------------------------------------------------------

    // Spy on toaster.
    spyOn(toastr, 'error');

    // Click on "Save".
    elements.save.trigger('click');
    NL.respondLast500();

    // Should flash error.
    expect(toastr.error).toHaveBeenCalledWith(
      Neatline.g.neatline.strings.exhibit.save.error
    );

  });


  it('should refresh the exhibit when save succeeds', function() {

    // ------------------------------------------------------------------------
    // When the "Save" button is clicked and the request succeeds, the exhibit
    // should be refreshed to manifest the new styles on the map.
    // ------------------------------------------------------------------------


    var vent = NL.getEventSpy();

    // Click on "Save".
    elements.save.trigger('click');
    NL.respondLast200(fixtures.exhibit);

    // Should refresh the exhibit.
    expect(vent).toHaveBeenCalledWith('refresh', {
      source: Neatline.Editor.Exhibit.Styles.ID
    });

  });


});
