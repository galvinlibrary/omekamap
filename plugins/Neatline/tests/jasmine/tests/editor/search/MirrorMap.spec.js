
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Search | Mirror Map', function() {


  var fixtures = {
    list: read('EditorSearchMirrorMap.list.json'),
    map:  read('EditorSearchMirrorMap.map.json')
  };


  beforeEach(function() {
    NL.loadEditor();
    NL.respondRecordList200(fixtures.list);
  });


  it('should not load records when `map:` is entered', function() {

    // ------------------------------------------------------------------------
    // When `map:` is typed into the search box, the regular GET request for
    // records should not be issued.
    // ------------------------------------------------------------------------

    // Keyup with `map:`.
    var c1 = NL.server.requests.length;
    NL.v.search.__ui.search.val('map:');
    NL.v.search.__ui.search.trigger('keyup');
    var c2 = NL.server.requests.length;
    expect(c2).toEqual(c1);

    // Keyup with `map:other`.
    var c1 = NL.server.requests.length;
    NL.v.search.__ui.search.val('map:other');
    NL.v.search.__ui.search.trigger('keyup');
    var c2 = NL.server.requests.length;
    expect(c2).toEqual(c1);

  });


  it('should start mirroring when query pattern entered', function() {

    // ------------------------------------------------------------------------
    // When `map:` is typed into the search box, the record list should sync
    // with the collection on the map.
    // ------------------------------------------------------------------------

    NL.respondMap200(fixtures.map);

    // Keyup with `map:` in the box.
    NL.v.search.__ui.search.val('map:').trigger('keyup');

    // List should synchronize with map.
    var recordRows = NL.getRecordListRows();
    expect($(recordRows[0]).find('.title')).toHaveText('map1');
    expect($(recordRows[1]).find('.title')).toHaveText('map2');
    expect($(recordRows[2]).find('.title')).toHaveText('map3');
    expect(recordRows.length).toEqual(3);

  });


  it('should start mirroring on route request', function() {

    // ------------------------------------------------------------------------
    // When a route is requested with `map:` as the search query, the record
    // list shold synchronize with the collection on the map.
    // ------------------------------------------------------------------------

    NL.respondMap200(fixtures.map);

    // Request route with `map:` as query.
    NL.navigate('records/search/query=map:');

    // List should synchronize with map.
    var recordRows = NL.getRecordListRows();
    expect($(recordRows[0]).find('.title')).toHaveText('map1');
    expect($(recordRows[1]).find('.title')).toHaveText('map2');
    expect($(recordRows[2]).find('.title')).toHaveText('map3');
    expect(recordRows.length).toEqual(3);

  });


  it('should mirror when map is updated', function() {

    // ------------------------------------------------------------------------
    // When map mirroring is active, the record list should display the same
    // set of records that is currently visible on the map.
    // ------------------------------------------------------------------------

    // Keyup with `map:` in the box.
    NL.v.search.__ui.search.val('map:').trigger('keyup');

    // Ingest new records on the map.
    NL.refreshMap(fixtures.map);

    // List should synchronize with map.
    var recordRows = NL.getRecordListRows();
    expect($(recordRows[0]).find('.title')).toHaveText('map1');
    expect($(recordRows[1]).find('.title')).toHaveText('map2');
    expect($(recordRows[2]).find('.title')).toHaveText('map3');
    expect(recordRows.length).toEqual(3);

  });


  it('should not show pagination when mirroring', function() {

    // ------------------------------------------------------------------------
    // When map mirroring is active, the pagination should not be displayed,
    // even when the number of records exceeds the page limit.
    // ------------------------------------------------------------------------

    // Set page length to 1.
    Neatline.g.neatline.per_page = 1;

    // Load 3 records on the map.
    NL.respondMap200(fixtures.map);

    // Activate mirroring.
    NL.v.search.__ui.search.val('map:').trigger('keyup');

    // Pagination should not be visible.
    expect(NL.v.records.$el).not.toContainHtml('.pagination');

  });


  it('should stop mirroring when query pattern broken', function() {

    // ------------------------------------------------------------------------
    // When the `map:` query pattern is broken, the record list should stop
    // mirroring the map and start loading regular search results.
    // ------------------------------------------------------------------------

    // Keyup with `map:` in the box.
    NL.v.search.__ui.search.val('map:').trigger('keyup');

    // Backspace once.
    NL.v.search.__ui.search.val('map').trigger('keyup');

    // Respond with default record collection.
    NL.respondLast200(fixtures.list);

    // Update map records.
    NL.refreshMap(fixtures.map);

    // List should not synchronize with map.
    var recordRows = NL.getRecordListRows();
    expect($(recordRows[0]).find('.title')).toHaveText('list1');
    expect($(recordRows[1]).find('.title')).toHaveText('list2');
    expect($(recordRows[2]).find('.title')).toHaveText('list3');
    expect(recordRows.length).toEqual(3);

  });


});
