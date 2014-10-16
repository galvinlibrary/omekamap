
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Styles | Open Form', function() {


  var fixtures = {
    exhibit: read('EditorStyles.json')
  };


  beforeEach(function() {
    NL.loadEditor();
  });


  it('should populate form with exhibit data', function() {

    // ------------------------------------------------------------------------
    // When the "Styles" is displayed, the form should load exhibit data.
    // ------------------------------------------------------------------------

    NL.navigate('styles');
    NL.respondLast200(fixtures.exhibit);

    // Form should be populated.
    expect(NL.v.styles.styles.getSession().getValue()).toEqual('1');
    expect(NL.v.styles.$('input[name="map-focus"]').val()).toEqual('2');
    expect(NL.v.styles.$('input[name="map-zoom"]').val()).toEqual('3');

  });


});
