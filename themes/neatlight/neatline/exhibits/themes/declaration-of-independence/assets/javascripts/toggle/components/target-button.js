
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Toggle.Components', function(Components) {


  Components.TargetButton = React.createClass({


    /**
     * A text/painting/map toggle button.
     */
    render: function() {

      // Classes on the container <li>.
      var itemClasses = {
        disabled: !this.props.slug,
        target: true
      };

      // If a model is bound to the button.
      if (this.props.model) {

        // Is the button highlighted or selected?
        if (this.props.model.get('slug') == this.props.slug) {
          itemClasses['selected'] = this.props.selected;
          itemClasses['highlighted'] = !this.props.selected;
        }

      }

      // Glyphicon classes.
      var iconClasses = {
        glyphicon: true
      };

      // Construct the icon name.
      iconClasses['glyphicon-'+this.props.icon] = true;

      // Convert to class strings.
      var itemCx = React.addons.classSet(itemClasses);
      var iconCx = React.addons.classSet(iconClasses);

      return (
        <li className={itemCx} onClick={this.select}>
          <span className={iconCx} />
          <span className="name">{this.props.text}</span>
        </li>
      );

    },


    /**
     * By default, no origin slug.
     */
    getDefaultProps: function() {
      return {
        signerSlug: null
      };
    },


    /**
     * Select the target.
     */
    select: function() {
      if (this.props.slug) {
        this.publish('select', this.props.slug);
      }
    },


    /**
     * Publish an event with the model, identified by slug.
     */
    publish: function(event, slug) {

      // Pop the record out of the map collection.
      var record = Neatline.request('MAP:getRecords').findWhere({
        slug: slug
      });

      // Publish the event.
      Neatline.vent.trigger(event, {
        model: record,
        signerSlug: this.props.signerSlug,
        source: 'TOGGLE'
      });

    }


  });


});
