
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
        x1: x1, y1: y1, x2: x1, y2: y1
      });

      // Animate the line length.
      this.line
        .transition()
        .attr('x2', x2)
        .attr('y2', y2)
        .each('end', _.bind(function() {
          // Place the dot at the end of the line.
          this.svg.append('svg:circle').attr({ cx: x2, cy: y2, r: 5 });
        }, this));

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
