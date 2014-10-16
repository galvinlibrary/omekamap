
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Toggle', function(Toggle) {


  Toggle.Controller = Neatline.Shared.Controller.extend({


    slug: 'TOGGLE',

    events: [

      'highlight',
      'unhighlight',
      'select',
      'unselect',

      {'MAP:moveEnd': 'move'}

    ],


    /**
     * Render the top-level component.
     */
    init: function() {
      this.toggle = React.renderComponent(
        Toggle.Components.Toggle(), $('#toggle').get(0)
      );
    },


    /**
     * Highlight a signer.
     *
     * @param {Object} args: Event arguments.
     */
    highlight: function(args) {
      var signers = this._getSignersBySlug(args.model.get('slug'));
      this.toggle.highlight(signers, args.model);
    },


    /**
     * Unhighlight a signer.
     */
    unhighlight: function() {
      this.toggle.unhighlight();
    },


    /**
     * Select a signer.
     *
     * @param {Object} args: Event arguments.
     */
    select: function(args) {

      // When Benjamin Franklin is selected, and "Map" is clicked/toggled, the
      // toggle widget should retain its selection on Benjan Franklin, instead
      // of displaying the list of signers from Philadelphia.

      var slug = args.signerSlug ?
        args.signerSlug :
        args.model.get('slug');

      var signers = this._getSignersBySlug(slug);
      this.toggle.select(signers, args.model);

    },


    /**
     * Unselect a signer.
     *
     * @param {Object} args: Event arguments.
     */
    unselect: function(args) {
      this.toggle.unselect();
    },


    /**
     * When the map is moved, unselect a generic exhibit target.
     *
     * @param {Object} args: Event arguments.
     */
    move: function(args) {
      this.toggle.unselectGenericTarget();
    },


    /**
     * Given a text/painting/map slug, get an array of one or more signers
     * that are associated with the record.
     *
     * @param {String} slug: An instance slug.
     */
    _getSignersBySlug: function(slug) {
      return _.filter(Toggle.signers, function(signer) {
        return _.contains(_.values(signer.records), slug);
      });
    }


  });


});
