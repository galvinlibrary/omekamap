
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Toggle.Components', function(Components) {


  Components.ResidentButton = React.createClass({


    /**
     * A signer link, displayed when one location has many signers.
     */
    render: function() {
      return (
        <li className="signer" onClick={this.select}>
          <span>{this.props.signer.name}</span>
        </li>
      );
    },


    /**
     * Select the target.
     */
    select: function() {
      this.publish('select', this.props.signer.records.map);
    },


    /**
     * Publish an event with the model, identified by slug.
     */
    publish: function(event, slug) {

      // Get the record out of the map collection.
      var record = Neatline.request('MAP:getRecords').findWhere({
        slug: slug
      });

      // Publish the event.
      Neatline.vent.trigger(event, {
        model: record,
        signerSlug: this.props.signer.records.text,
        source: 'TOGGLE'
      });

    }


  });


});
