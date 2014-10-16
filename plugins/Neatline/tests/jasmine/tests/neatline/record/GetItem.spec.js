
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Record | Get Item', function() {


  beforeEach(function() {
    NL.loadNeatline();
  });


  describe('should load the item on first access', function() {

    it('when the record is saved', function(done) {

      // ----------------------------------------------------------------------
      // When the `item` field is accessed for the first time on a record that
      // has been saved, the record-inflected item body should be loaded.
      // ----------------------------------------------------------------------

      // Saved.
      var record = new Neatline.Shared.Record.Model({ id: 1, item_id: 1 });

      // Should set `item` when loaded.
      record.on('change:item', function() {
        expect(record.get('item')).toEqual('item');
        done();
      });

      record.get('item');

      // Should generate GET request to the item body API.
      NL.assertLastRequestRoute(Neatline.g.neatline.item_body_api+'/1');
      NL.assertLastRequestMethod('GET');

      // Should request record-inflected body.
      NL.assertLastRequestHasGetParameter('record', 1);

      // Respond with item.
      NL.respondLast200('item', 'text/html');

    });

    it('when the record is saved', function(done) {

      // ----------------------------------------------------------------------
      // When the `item` field is accessed for the first time on a record that
      // has been _not_ saved, the default item body should be loaded.
      // ----------------------------------------------------------------------

      // Unsaved.
      var record = new Neatline.Shared.Record.Model({ item_id: 1 });

      // Should set `item` when loaded.
      record.on('change:item', function() {
        expect(record.get('item')).toEqual('item');
        done();
      });

      record.get('item');

      // Should generate GET request to the item body API.
      NL.assertLastRequestRoute(Neatline.g.neatline.item_body_api+'/1');
      NL.assertLastRequestMethod('GET');

      // Should _not_ pass out non-existent id.
      NL.assertNotLastRequestHasGetParameter('record');

      // Respond with item.
      NL.respondLast200('item', 'text/html');

    });

  });


  it('should not load the item when no parent item is defined', function() {

    // ------------------------------------------------------------------------
    // If the record isn't associated with an Omeka item, item content should
    // never be requested.
    // ------------------------------------------------------------------------

    // Record with no parent item.
    var record = new Neatline.Shared.Record.Model({ id: 1 });

    var c1 = NL.server.requests.length;
    record.get('item');
    var c2 = NL.server.requests.length;
    expect(c2).toEqual(c1);

  });


  it('should not reload the item', function() {

    // ------------------------------------------------------------------------
    // Once the item content has been hydrated by the first access, it should
    // not be reloaded by subsequent requests for the `item` key.
    // ------------------------------------------------------------------------

    var record = new Neatline.Shared.Record.Model({ id: 1, item_id: 1 });

    record.get('item');

    // Hydrate the item.
    NL.respondLast200('item', 'text/html');

    var c1 = NL.server.requests.length;
    record.get('item');
    var c2 = NL.server.requests.length;
    expect(c2).toEqual(c1);

  });


});
