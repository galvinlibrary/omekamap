
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Lines', function(Lines) {


  Lines.Controller = Neatline.Shared.Controller.extend({


    slug: 'WORDLINES',

    events: [

      'highlight',
      'unhighlight',

      { 'select': 'unhighlight' }

    ],


    /**
     * Create the view.
     */
    init: function() {
      this.view = new Neatline.Lines.View();
    },


    /**
     * Render line on `highlight`.
     *
     * @param {Object} args: Event arguments.
     */
    highlight: function(args) {

      if (_.contains(['MAP', 'TEXT'], args.source)) {

        // Get the model's vector layer.
        var layer = Neatline.request('MAP:getVectorLayer', args.model);

        // Get the centroid from the vector layer.
        if (layer.features.length !== 0) {
          var lonlat = layer.getDataExtent().getCenterLonLat();
        }

        else return; // Break if no focus or geometry.

        // Get the viewport pixel of the target.
        var center = layer.getViewPortPxFromLonLat(lonlat);

        // Get the span position.
        var span = Neatline.request('TEXT:getSpansByModel', args.model);
        if (span.length == 0) return;

        // Compute the span center.
        var offset = span.offset();
        var x = offset.left + span.width() / 2;
        var y = offset.top + span.height() / 2;

        // Render the line.
        this.view.show(x, y, center.x, center.y);

      }

    },


    /**
     * Render line on `highlight`.
     *
     * @param {Object} args: Event arguments.
     */
    unhighlight: function(args) {
      this.view.hide();
    },


    /**
     * Get the viewport target pixel for a record model.
     *
     * @param {Object} model: A record model.
     * @return {OpenLayers.Pixel}: A viewport pixel.
     */
    _getMapCenter: function(model) {
      var layer = Neatline.request('MAP:getVectorLayer', model);
      var focus = model.get('map_focus');
    }


  });


});
