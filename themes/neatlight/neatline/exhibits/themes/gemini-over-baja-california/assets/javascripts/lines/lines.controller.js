
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

      { 'select': 'unhighlight' },

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

      if (args.source == 'TEXT') {

        // Get the model's vector layer and focus coordinate.
        var layer = Neatline.request('MAP:getVectorLayer', args.model);
        var focus = args.model.get('map_focus');

        // If a focus is defined, use it as the line endpoint.
        if (focus) {
          var lonlat = new OpenLayers.LonLat(focus.split(','));
        }

        // Otherwise, use the centroid from the vector layer.
        else if (layer.features.length !== 0) {
          var lonlat = layer.getDataExtent().getCenterLonLat();
        }

        else return; // Break if no focus or geometry.

        // Get the viewport pixel of the target.
        var center = layer.getViewPortPxFromLonLat(lonlat);

        // Get the span position.
        var span = $(args.event.target);
        var offset = span.offset();

        // Compute the top left corner.
        var x = offset.left + span.outerWidth() + 5;
        var y = offset.top + 5;

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

        // Get the vector layer and map focus.
        var layer = Neatline.request('MAP:getVectorLayer', model);
        var focus = model.get('map_focus');

    }


  });


});
