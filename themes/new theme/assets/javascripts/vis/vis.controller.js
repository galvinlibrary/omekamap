
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Vis', function(Vis) {


  Vis.Controller = Neatline.Shared.Controller.extend({


    slug: 'VIS',

    events: [

      'select',
      'unselect',

      { 'MAP:moveStart': 'minimize' }

    ],


    /**
     * Create the view.
     */
    init: function() {

      this.view = new Neatline.Vis.View({
        el: $('#timeline'), slug: this.slug
      });

      this.view.load();

    },


    /**
     * Select an event.
     *
     * @param {Object} args
     */
    select: function(args) {
      if (args.source !== this.slug) {
        this.view.renderSelect(args.model)
      }
    },


    /**
     * Unselect an event.
     *
     * @param {Object} args
     */
    unselect: function(args) {
      if (!_.contains([this.slug, 'EVENTS'], args.source)) {
        this.view.renderUnselect(args.model)
      }
    },


    /**
     * Minimize the timeline.
     */
    minimize: function() {
      this.view.minimize();
    }


  });


});
