
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Toggle.Components', function(Components) {


  Components.Declaration = React.createClass({


    /**
     * When no signer is highlighted/selected.
     */
    render: function() {

      // Alias <TargetButton />.
      var TargetButton = Components.TargetButton;

      return (
        <ul className="toggle">

          <TargetButton
            text="Text"
            icon="list-alt"
            slug="text"
            selected={this.props.selected}
            model={this.props.model}
          />

          <TargetButton
            text="Painting"
            icon="user"
            slug="painting"
            selected={this.props.selected}
            model={this.props.model}
          />

          <TargetButton
            text="Map"
            icon="globe"
            slug="map"
            selected={this.props.selected}
            model={this.props.model}
          />

          <li className="toggle" onClick={this.toggle}>
            <span className="glyphicon glyphicon-refresh" />
          </li>

        </ul>
      );

    },


    /**
     * Toggle through the targets.
     */
    toggle: function() {

      var next;

      // Get the slug for the next record.
      if (this.props.model) {

        var order = ['text', 'painting', 'map'];
        var slug = this.props.model.get('slug');
        var index = _.indexOf(order, slug);

        if (index < (order.length-1)) next = order[index+1]
        else next = order[0];

      } else {
        next = 'text';
      }

      // Get the record out of the map collection.
      var record = Neatline.request('MAP:getRecords').findWhere({
        slug: next
      });

      // Publish the event.
      Neatline.vent.trigger('select', {
        model: record, source: 'TOGGLE'
      });

    }


  });


});
