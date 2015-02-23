<?php
/**
 * @copyright Daniel Berthereau, 2012-2014
 * @license http://www.cecill.info/licences/Licence_CeCILL_V2.1-en.txt
 * @package CleanUrl
 */

/**
 * Base class for CleanUrl tests.
 */
class CleanUrl_Test_AppTestCase extends Omeka_Test_AppTestCase
{
    const PLUGIN_NAME = 'CleanUrl';

    protected $_isAdminTest = false;

    protected $_view;

    // All records are saved during start, so all identifiers and routes can be
    // checked together.
    protected $recordsMetadata = array(
        array(
            'type' => 'Collection',
            'Title' => 'Title of Collection #1',
            'Identifier' => array(
                'document: Identifier_of_Collection_1',
        )),
        array(
            'type' => 'Collection',
            'Title' => 'Title of Collection #2',
            'Identifier' => array(
                'document: Identifier_of_Collection_2',
                // A duplicate identifier of an item.
                'document: Identifier_of_Item_3',
                // A duplicate identifier of a file.
                'document: Identifier_of_File_2',
        )),
        array(
            'type' => 'Item',
            'Title' => 'Title of Item #1',
            'Identifier' => array(
                'document: Identifier_of_Item_1',
        )),
        array(
            'type' => 'Item',
            'Title' => 'Title of Item #2',
            'Identifier' => array(
                'document: Identifier_of_Item_2',
                'document: Second_Identifier_of_Item_2',
                // Unsanitized identifier of Item 1 (with spaces).
                'document: Unsanitized identifier of Item 2',
                // A metadata that is not an identifier (no prefix).
                'Third_Identifier_of_Item_2',
                // An identifier that contains a forbidden character ("/").
                'document: Fourth/Identifier_of_Item_2',
                // A duplicate identifier of a collection.
                'document: Identifier_of_Collection_2',
                // A duplicate identifier of a file.
                'document: Identifier_of_File_2',
                // A duplicate identifier of a file.
                'document: Second_Identifier_of_File_2',
        )),
        array(
            'type' => 'Item',
            'Title' => 'Title of Item #3',
            'Identifier' => array(
                'document: Identifier_of_Item_3',
                // Another prefix.
                'doc: Identifier_of_Item_3',
        )),
        array(
            'type' => 'File',
            'Title' => 'Title of File #1',
            'Identifier' => array(
                'document: Identifier_of_File_1',
        )),
        array(
            'type' => 'File',
            'Title' => 'Title of File #2',
            'Identifier' => array(
                'document: Identifier_of_File_2',
                'document: Second_Identifier_of_File_2',
                // A duplicate identifier of a collection.
                'document: Identifier_of_Collection_2',
                // A duplicate identifier of an item.
                'document: Identifier_of_Item_2',
                // A duplicate identifier of an item.
                'document: Identifier_of_Item_3',
        )),
    );

    public function setUp()
    {
        parent::setUp();

        $pluginHelper = new Omeka_Test_Helper_Plugin;
        $pluginHelper->setUp(self::PLUGIN_NAME);

        $this->_view = get_view();

        $this->_prepareRecords();
        $this->_reloadRoutes();
    }

    public function assertPreConditions()
    {
        $records = $this->db->getTable('Collection')->findAll();
        $count = 2;
        $this->assertEquals($count, count($records), sprintf('There should be %d collections.', $count));

        $records = $this->db->getTable('Item')->findAll();
        $count = 3;
        $this->assertEquals($count, count($records), sprintf('There should be %d items.', $count));

        $records = $this->db->getTable('File')->findAll();
        $count = 2;
        $this->assertEquals($count, count($records), sprintf('There should be %d files.', $count));
    }

    /**
     * Get a record by title.
     *
     * @internal This function allows a quick check of records, because id can
     * change between tests.
     */
    protected function getRecordByTitle($title)
    {
        $record = null;
        $elementSetName = 'Dublin Core';
        $elementName = 'Title';
        $element = $this->db->getTable('Element')->findByElementSetNameAndElementName($elementSetName, $elementName);
        $elementTexts = $this->db->getTable('ElementText')->findBy(array('element_id' => $element->id, 'text' => $title), 1);
        $elementText = reset($elementTexts);
        if ($elementText) {
            $record = get_record_by_id($elementText->record_type, $elementText->record_id);
        }
        return $record;
    }

    /**
     * Set some records with identifier to test.
     */
    protected function _prepareRecords()
    {
        // Remove default records.
        $this->_deleteAllRecords();

        $metadata = array('public' => true);
        $isHtml = false;

        $collection = null;
        $files = array();
        $fileKey = 0;
        foreach ($this->recordsMetadata as $recordMetadata) {
            $identifiers = array();
            foreach ($recordMetadata['Identifier'] as $identifier) {
                $identifiers[] = array('text' => $identifier, 'html' => $isHtml);
            }
            $elementTexts = array('Dublin Core' => array(
                'Title' => array(array('text' => $recordMetadata['Title'], 'html' => $isHtml)),
                'Identifier' => $identifiers,
            ));
            switch ($recordMetadata['type']) {
                case 'Collection':
                    $record = insert_collection($metadata, $elementTexts);
                    if (empty($collection)) {
                        $collection = $record;
                    }
                    break;
                case 'Item':
                    $record = insert_item($metadata, $elementTexts);
                    // This check  allows to insert two files to the first item
                    // and to get them. Collection of the first item is set too.
                    if (empty($files)) {
                        $fileUrl = TEST_DIR . '/_files/test.txt';
                        $files = insert_files_for_item($record, 'Filesystem', array($fileUrl, $fileUrl));
                        update_item($record, array('collection_id' => $collection->id));
                    }
                    break;
                case 'File':
                    $record = $files[$fileKey];
                    $record->addElementTextsByArray($elementTexts);
                    $record->save();
                    $fileKey++;
                    break;
            }
        }
    }

    protected function _deleteAllRecords()
    {
        foreach (array('Collection', 'Item', 'File') as $recordType) {
            $records = get_records($recordType, array(), 0);
            foreach ($records as $record) {
                $record->delete();
            }
        }
    }

    protected function _reloadRoutes()
    {
        $plugin = new CleanUrlPlugin;
        $plugin->hookDefineRoutes(array('router' => Zend_Controller_Front::getInstance()->getRouter()));
    }
}
