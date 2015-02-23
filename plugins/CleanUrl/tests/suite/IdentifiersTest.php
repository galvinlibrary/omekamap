<?php
class CleanUrl_IdentifiersTest extends CleanUrl_Test_AppTestCase
{
    /**
     * Tests to check the default identifier of a record.
     */
    public function testGetRecordIdentifier()
    {
        $prefix = get_option('clean_url_identifier_prefix');
        foreach ($this->recordsMetadata as $recordMetadata) {
            $title = $recordMetadata['Title'];
            $identifier = reset($recordMetadata['Identifier']);
            $record = $this->getRecordByTitle($title);
            $recordIdentifier = $this->_view->getRecordIdentifier($record);
            $this->assertEquals($identifier, $prefix . ' ' . $recordIdentifier, sprintf('A %s has a wrong identifier.', $recordMetadata['type']));
        }
    }

    /**
     * Tests to get the good record from an identifier.
     */
    public function testGetRecordFromIdentifier()
    {
        // Duplicates are removed.
        $identifiersAndTitles = array(
            'Identifier_of_Collection_1' => 'Title of Collection #1',
            'Identifier_of_Collection_2' => 'Title of Collection #2',
            // 'Identifier_of_Item_3' => 'Title of Collection #2',
            // 'Identifier_of_File_2' => 'Title of Collection #2',
            'Identifier_of_Item_1' => 'Title of Item #1',
            'Identifier_of_Item_2' => 'Title of Item #2',
            'Second_Identifier_of_Item_2' => 'Title of Item #2',
            'Unsanitized identifier of Item 2' => 'Title of Item #2',
            // 'Third_Identifier_of_Item_2' => 'Title of Item #2',
            'Fourth/Identifier_of_Item_2' => 'Title of Item #2',
            // 'Identifier_of_Collection_2' => 'Title of Item #2',
            // 'Identifier_of_File_2' => 'Title of Item #2',
            // 'Second_Identifier_of_File_2' => 'Title of Item #2',
            // 'Identifier_of_Item_3' => 'Title of Item #3',
            'Identifier_of_File_1' => 'Title of File #1',
            // 'Identifier_of_File_2' => 'Title of File #2',
            // 'Second_Identifier_of_File_2' => 'Title of File #2',
            // 'Identifier_of_Collection_2' => 'Title of File #2',
            // 'Identifier_of_Item_2' => 'Title of File #2',
            // 'Identifier_of_Item_3' => 'Title of File #2',
        );

        $prefix = get_option('clean_url_identifier_prefix');
        foreach ($identifiersAndTitles as $identifier => $title) {
            $record = $this->getRecordByTitle($title);
            $recordFrom = $this->_view->getRecordFromIdentifier($identifier);
            $this->assertTrue(!empty($recordFrom), sprintf('Cannot get a record from identifier "%s".', $identifier));
            $recordFromTitle = metadata($recordFrom, array('Dublin Core', 'Title'));
            $this->assertEquals($title, $recordFromTitle, sprintf('Cannot get the correct record from identifier "%s".', $identifier));
        }
    }

    /**
     * Tests to get the good record from a duplicate identifier (Collection
     * before Item and before File).
     */
    public function testGetRecordFromDuplicateIdentifier()
    {
        $identifiersAndTitles = array(
            'Identifier_of_Item_3' => 'Title of Collection #2',
            'Identifier_of_File_2' => 'Title of Collection #2',
            'Second_Identifier_of_File_2' => 'Title of Item #2',
        );

        $prefix = get_option('clean_url_identifier_prefix');
        foreach ($identifiersAndTitles as $identifier => $title) {
            $record = $this->getRecordByTitle($title);
            $recordFrom = $this->_view->getRecordFromIdentifier($identifier);
            $this->assertTrue(!empty($recordFrom), sprintf('Cannot get a record from identifier "%s".', $identifier));
            $recordFromTitle = metadata($recordFrom, array('Dublin Core', 'Title'));
            $this->assertEquals($title, $recordFromTitle, sprintf('Cannot get the correct record from identifier "%s".', $identifier));
        }
    }

    /**
     * Tests that doesn't get a record  from a bad identifier.
     */
    public function testGetNoRecordFromBadIdentifier()
    {
        $identifiers = array(
            "who's bad",
            'Third_Identifier_of_Item_2',
            // TODO To be done, but this is a routing problem.
            // 'Fourth/Identifier_of_Item_2',
        );

        $prefix = get_option('clean_url_identifier_prefix');
        foreach ($identifiers as $identifier) {
            $record = $this->_view->getRecordFromIdentifier($identifier);
            $this->assertTrue(is_null($record), sprintf('Should not get a record from bad identifier "%s".', $identifier));
        }
    }
}
