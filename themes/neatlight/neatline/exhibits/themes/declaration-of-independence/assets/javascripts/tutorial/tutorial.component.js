
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Tutorial', function(Tutorial) {


  Tutorial.Component = React.createClass({


    mixins: [ReactBootstrap.OverlayMixin],


    /**
     * Render the button.
     */
    render: function() {

      var Button = ReactBootstrap.Button;

      return (
        <Button
          onClick={this.show}
          bsSize="xsmall">How does this work?</Button>
      );

    },


    /**
     * Cache the map instance.
     */
    componentWillMount: function() {
      this.setState({
        tutorial: $('#tutorial-hidden').html()
      });
    },


    /**
     * By default, hide the modal.
     */
    getInitialState: function() {
      return { open: true };
    },


    /**
     * Show the modal.
     */
    show: function() {
      this.setState({ open: true });
    },


    /**
     * Close the modal.
     */
    hide: function() {
      this.setState({ open: false });
    },


    /**
     * Render the biography modal.
     */
    renderOverlay: function() {

      if (!this.state.open) {
        return <span />;
      }

      var Modal = ReactBootstrap.Modal;

      return (
        <Modal onRequestHide={this.hide}>
          <div className="modal-body">

            <button
              className="close"
              onClick={this.hide}>×</button>

            <div className="signer tutorial-modal">

              <div
                className="partial"
                dangerouslySetInnerHTML={{
                  __html: this.state.tutorial
                }}></div>

              <div className="actions">

                <button
                  className="btn btn-default"
                  onClick={this.hide}>Got it</button>

              </div>

            </div>

          </div>
        </Modal>
      );

    }


  });


});
