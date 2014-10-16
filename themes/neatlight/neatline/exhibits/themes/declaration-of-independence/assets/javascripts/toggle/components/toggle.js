
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Toggle.Components', function(Components) {


  Components.Toggle = React.createClass({


    /**
     * Render the top-level markup.
     */
    render: function() {

      // When no signer is selected, show the exhibit-wide spinner.
      if (this.state.signers.length === 0) {

        // Alias <Declaration />.
        var Declaration = Components.Declaration;

        return (
          <Declaration
            model={this.state.model}
            selected={this.state.selected}
          />
        )

      }

      // If 1 signer is selected, show the spinner for that signer.
      else if (this.state.signers.length === 1) {

        // Alias <Signer />.
        var Signer = Components.Signer;

        return (
          <Signer
            signer={this.state.signers[0]}
            model={this.state.model}
            selected={this.state.selected}
          />
        )
      }

      // If multiple signers are resolved, show a list of names.
      else if (this.state.signers.length > 1) {

        // Alias <Hometown />.
        var Hometown = Components.Hometown;

        return (
          <Hometown
            signers={this.state.signers}
            model={this.state.model}
          />
        )
      }

    },


    /**
     * By default, no signers selected.
     */
    getInitialState: function() {
      return {
        signers: [],
        selected: false,
        model: null
      };
    },


    /**
     * Highlight a signer (or signers).
     *
     * @param {Object} signers: The signers associated with the record.
     * @param {model} model: The highlighted record.
     */
    highlight: function(signers, model) {

      // Flip off a generic selection.
      if (this.genericTargetIsSelected() && !_.isEmpty(signers)) {
        this.unselect();
      }

      // Highlight if no selection.
      if (!this.state.selected) {
        this.setState({
          signers: signers,
          model: model
        });
      }

    },


    /**
     * Unhighlight the current signer(s).
     */
    unhighlight: function(signers, model) {
      if (!this.state.selected) {
        this.replaceState(this.getInitialState());
      }
    },


    /**
     * Select a signer (or signers).
     *
     * @param {Object} signers: The signers associated with the record.
     * @param {model} model: The selected record.
     */
    select: function(signers, model) {
      this.setState({
        selected: true,
        signers: signers,
        model: model
      });
    },


    /**
     * Unselect the current signer(s).
     */
    unselect: function(signers, model) {
      this.replaceState(this.getInitialState());
    },


    /**
     * If the currently-selected model is one of the generic, exhibit-wide
     * text/painting/map targets, unselect it.
     */
    unselectGenericTarget: function(signers, model) {
      if (this.genericTargetIsSelected()) {
        this.unselect();
      }
    },


    /**
     * Is an exhibit-generic target currently selected?
     *
     * @return {Boolean}
     */
    genericTargetIsSelected: function() {

      var isGeneric = false;

      if (this.state.model) {

        var slug = this.state.model.get('slug');

        // Is the model an exhibit-generic target?
        if (_.contains(['text', 'painting', 'map'], slug)) {
          isGeneric = true;
        }

      }

      return isGeneric;

    }


  });


});
