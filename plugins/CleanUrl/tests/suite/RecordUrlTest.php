<?php
class CleanUrl_RecordUrlTest extends CleanUrl_Test_AppTestCase
{
    /**
     * Tests to get the good record url of a record via core functions.
     */
    public function testRecordUrl()
    {
        $record = $this->getRecordByTitle('Title of Collection #1');
        $generic = get_option('clean_url_collection_generic');
        $generic = $generic ? '/' . $generic : '/';
        $url = record_url($record);
        $this->assertEquals($generic . 'Identifier_of_Collection_1', $url, sprintf('A collection has a wrong record url.'));

        $record = $this->getRecordByTitle('Title of Item #1');
        $generic = get_option('clean_url_item_generic');
        $generic = $generic ? '/' . $generic : '';
        $url = record_url($record);
        $this->assertEquals($generic . 'Identifier_of_Item_1', $url, sprintf('A collection has a wrong record url.'));

        $record = $this->getRecordByTitle('Title of File #1');
        $generic = get_option('clean_url_file_generic');
        $generic = $generic ? '/' . $generic : '';
        $url = record_url($record);
        $this->assertEquals($generic . 'Identifier_of_File_1', $url, sprintf('A collection has a wrong record url.'));
    }
}
