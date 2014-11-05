
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Layers | Google', function() {


  var layer;


  beforeEach(function() {

    NL.loadNeatline();

    window.google = {
      maps: {
        MapTypeId: {
          TERRAIN:    'terrain',
          ROADMAP:    'roadmap',
          SATELLITE:  'satellite',
          HYBRID:     'hybrid'
        }
      }
    };

  });


  afterEach(function() {
    expect(layer.CLASS_NAME).toEqual('OpenLayers.Layer.Google');
    expect(layer.name).toEqual('Title');
  });


  it('should construct a `physical` layer', function() {

    layer = Neatline.request('MAP:LAYERS:Google', {
      title: 'Title',
      properties: {
        provider: 'physical'
      }
    });

    expect(layer.type).toEqual(google.maps.MapTypeId.TERRAIN);

  });


  it('should construct a `streets` layer', function() {

    layer = Neatline.request('MAP:LAYERS:Google', {
      title: 'Title',
      properties: {
        provider: 'streets'
      }
    });

    expect(layer.type).toEqual(google.maps.MapTypeId.ROADMAP);

  });


  it('should construct a `satellite` layer', function() {

    layer = Neatline.request('MAP:LAYERS:Google', {
      title: 'Title',
      properties: {
        provider: 'satellite'
      }
    });

    expect(layer.type).toEqual(google.maps.MapTypeId.SATELLITE);

  });


  it('should construct a `hybrid` layer', function() {

    layer = Neatline.request('MAP:LAYERS:Google', {
      title: 'Title',
      properties: {
        provider: 'hybrid'
      }
    });

    expect(layer.type).toEqual(google.maps.MapTypeId.HYBRID);

  });


});
