
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.on('start', function() {
  Neatline.vent.on('MAP:ingest', function() {

    var layers = Neatline.request('MAP:getWmsLayers');
    var loader = $('#wms-loader');

    _.each(layers, function(layer) {

      // When loading starts.
      layer.events.register('loadstart', layer, function() {
        loader.show();
      });

      // When loading finishes.
      layer.events.register('loadend', layer, function() {

        // Are any layers loading?
        var loading = _.reduce(layers, function(memo, layer) {
          return memo || layer.loading;
        }, false);

        if (!loading) loader.hide();

      });

    });

  });
});
