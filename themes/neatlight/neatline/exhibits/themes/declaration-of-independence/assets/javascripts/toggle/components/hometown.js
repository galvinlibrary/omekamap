
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Toggle.Components', function(Components) {


  Components.Hometown = React.createClass({


    /**
     * When one hometown points to multiple signers.
     */
    render: function() {

      // Alias <ResidentButton />.
      var ResidentButton = Components.ResidentButton;

      var signers = _.map(this.props.signers, function(signer) {
        return (<ResidentButton signer={signer} />);
      });

      return (
        <ul className="signers">

          <li className="hometown">
            <span>{this.props.model.get('title')}</span>
          </li>

          {signers}

        </ul>
      );

    }


  });


});
