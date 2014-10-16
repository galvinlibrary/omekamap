
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Vis', function(Vis) {


  Vis.View = Backbone.View.extend({


    events: {
      'click': 'maximize'
    },


    // STARTUP
    // ------------------------------------------------------------------------


    /**
     * Initialize the collection and timeline.
     */
    initialize: function(options) {

      this.slug = options.slug;

      // Spin up an empty records collection.
      this.records = new Neatline.Shared.Record.Collection();

      // Create timeline.
      this._initTimeline();
      this._initHighlight();
      this._initSelect();
      this._initMaximize();

    },


    /**
     * Initialize the timeline and groups.
     */
    _initTimeline: function() {

      // Register the bands.
      var groups = new vis.DataSet();
      _.each(Vis.bands, function(band) {
        groups.add({ id: band.tag, content: band.title });
      });

      // Spin up the timeline.
      this.timeline = new vis.Timeline(this.el);
      this.timeline.setGroups(groups);

      // Set display options.
      //this.timeline.setOptions({
        //padding: 2
      //});

    },


    /**
     * Listen for event highlights.
     */
    _initHighlight: function() {
      // TODO: Need to implement this in Vis.js.
    },


    /**
     * Listen for event selections.
     */
    _initSelect: function() {

      this.selected = [] // The currently-selected ids.

      // When an event is selected.
      this.timeline.on('select', _.bind(function(args) {

        // Which IDs were added and removed?
        var a = _.difference(args.items, this.selected);
        var r = _.difference(this.selected, args.items);

        // Select the added IDs, unselect the removed.
        _.each(a, _.bind(this.publishSelect, this));
        _.each(r, _.bind(this.publishUnselect, this));

        // Set the new IDs.
        this.selected = args.items;

      }, this));

    },


    /**
     * Maximize when the zoom level is changed.
     */
    _initMaximize: function() {
      this.timeline.on('rangechanged', _.bind(this.maximize, this));
    },


    // RECORDS
    // ------------------------------------------------------------------------


    /**
     * Load records for the timeline.
     */
    load: function() {
      var params = { hasDate: true };
      this.records.update(params, _.bind(this.ingest, this));
    },


    /**
     * Clear the timeline and render a new collection.
     *
     * @param {Object} records
     */
    ingest: function(records) {

      var events = new vis.DataSet();

      records.each(function(record) {

        // Pass if no start date.
        var start = record.get('start_date');
        if (!start) return;

        // Default parameters.
        var event = {
          id:       record.id,
          content:  record.get('title'),
          start:    start,
          model:    record
        };

        // If defined, add end date.
        var end = record.get('end_date');
        if (end) event['end'] = end;

        // Set the group.
        _.each(Vis.bands, function(band) {
          if (record.hasTag(band.tag)) {
            event['group'] = band.tag;
          }
        });

        events.add(event);

      });

      // Render the collection.
      this.timeline.setItems(events);

    },


    // EVENTS
    // ------------------------------------------------------------------------


    /**
     * Publish a record selection.
     *
     * @param {Number} id
     */
    publishSelect: function(id) {
      this.publish('select', this.records.get(id));
    },


    /**
     * Publish a record unselection.
     *
     * @param {Number} id
     */
    publishUnselect: function(id) {
      this.publish('unselect', this.records.get(id));
    },


    /**
     * Render a record selection.
     *
     * @param {Object} model
     */
    renderSelect: function(model) {
      this.selected = [model.id]
      this.timeline.setSelection(this.selected);
    },


    /**
     * Remove a record selection.
     *
     * @param {Object} model
     */
    renderUnselect: function(model) {
      this.selected = _.without(this.selected, model.id);
      this.timeline.setSelection(this.selected);
    },


    /**
     * Shrink the timeline.
     */
    minimize: function() {
      this.$el.addClass('minimized');
    },


    /**
     * Expand the timeline.
     */
    maximize: function() {
      this.$el.removeClass('minimized');
    },


    /**
     * Broadcast a public event.
     *
     * @param {String} event
     * @param {Object} model
     */
    publish: function(event, model) {
      Neatline.vent.trigger(event, {
        model: model, source: this.slug
      });
    }


  });


});
