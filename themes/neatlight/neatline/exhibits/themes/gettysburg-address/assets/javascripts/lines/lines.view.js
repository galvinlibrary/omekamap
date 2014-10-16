
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Lines', function(Lines) {


  Lines.View = Backbone.View.extend({


    id: 'word-line',


    /**
     * Construct the SVG container.
     */
    initialize: function() {
      this.svg = d3.select(this.el).append('svg:svg');
    },


    /**
     * Render the line.
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     */
    show: function(x1, y1, x2, y2) {

      var h = $(window).height();
      var w = $(window).width();

      // Inject/fit the containers.
      this.$el.appendTo($('body')).css({ width: w, height: h });
      this.svg.attr('width', w).attr('height', h);

      // Render the line.
      this.line = this.svg.append('svg:line').attr({
        x1: x1, y1: y1, x2: x2, y2: y2
      });

    },


    /**
     * Hide the container.
     */
    hide: function() {
      this.svg.selectAll('line, circle').remove();
      this.$el.detach();
    }


  });


});
