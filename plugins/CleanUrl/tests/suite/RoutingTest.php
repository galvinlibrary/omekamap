<?php
class CleanUrl_RoutingTest extends CleanUrl_Test_AppTestCase
{
    public $baseCollection;
    public $baseItem;
    public $baseFile;

    public function setUp()
    {
        parent::setUp();

        $mainPath = '/' . get_option('clean_url_collection_generic');
        $this->baseCollection = $mainPath . get_option('clean_url_collection_generic');
        $this->baseItem = $mainPath . get_option('clean_url_item_generic');
        $this->baseFile = $mainPath . get_option('clean_url_file_generic');
    }

    /**
     * Tests to check routing system for collections.
     */
    public function testRoutingCollection()
    {
        $record = $this->getRecordByTitle('Title of Collection #1');
        $url = $this->baseCollection . 'Identifier_of_Collection_1';
        $route = 'cleanUrl_collections';
        $this->dispatch($url);
        $this->assertRoute($route);
        $this->assertModule('default');
        $this->assertController('collections');
        $this->assertAction('show');
    }

    /**
     * Tests to check routing system for items.
     *
     * @todo The route "cleanUrl_collections_item" fails if "collection" is
     * allowed for files, but the code works fine, so issue is in the test.
     */
    public function testRoutingItem()
    {
        $record = $this->getRecordByTitle('Title of Item #1');
        foreach (array(
                $this->baseItem . 'Identifier_of_Item_1' => 'cleanUrl_generic_item',
                $this->baseCollection . 'Identifier_of_Collection_1' . '/' . 'Identifier_of_Item_1' => 'cleanUrl_collections_item',
            ) as $url => $route) {
            $this->dispatch($url);
            $this->assertRoute($route);
            $this->assertModule('default');
            $this->assertController('items');
            $this->assertAction('show');
        }
    }

    /**
     * Tests to check routing system for files.
     */
    public function testRoutingFile()
    {
        // Allow all routes to check all of them.
        set_option('clean_url_file_alloweds', serialize(array(
            'generic', 'generic_item', 'collection', 'collection_item',
        )));
        $this->_reloadRoutes();

        $record = $this->getRecordByTitle('Title of File #1');
        foreach (array(
                $this->baseFile . 'Identifier_of_File_1' => 'cleanUrl_generic_file',
                $this->baseItem . 'Identifier_of_Item_1' . '/' . 'Identifier_of_File_1' => 'cleanUrl_generic_item_file',
                $this->baseCollection . 'Identifier_of_Collection_1' . '/' . 'Identifier_of_File_1' => 'cleanUrl_collections_file',
                $this->baseCollection . 'Identifier_of_Collection_1' . '/' . 'Identifier_of_Item_1' . '/' . 'Identifier_of_File_1' => 'cleanUrl_collections_item_file',
            ) as $url => $route) {
            $this->dispatch($url);
            $this->assertRoute($route);
            $this->assertModule('default');
            $this->assertController('files');
            $this->assertAction('show');
        }
    }

    /**
     * Tests to check routing system for bad url.
     */
    public function testRoutingBadIdentifier1()
    {
        $url = $this->baseItem . 'False_Identifier';
        $this->setExpectedException('Omeka_Controller_Exception_404');
        $this->dispatch($url);
    }

    /**
     * Tests to check routing system for bad url.
     */
    public function testRoutingBadIdentifier2()
    {
        $url = $this->baseCollection . 'Identifier_of_Collection_1' . '/' . 'False_Identifier';
        $this->setExpectedException('Omeka_Controller_Exception_404');
        $this->dispatch($url);
    }

    /**
     * Tests to check routing system for bad url.
     */
    public function testRoutingBadIdentifier3()
    {
        $url = $this->baseCollection . 'Identifier_of_Collection_2' . '/' . 'Identifier_of_Item_1';
        $this->setExpectedException('Omeka_Controller_Exception_404');
        $this->dispatch($url);
    }

    /**
     * Tests to check routing system for bad url.
     */
    public function testRoutingBadIdentifier4()
    {
        $url = $this->baseCollection . 'Identifier_of_Collection_1' . '/' . 'Identifier_of_Item_2' . '/' . 'Identifier_of_File_1';
        $this->setExpectedException('Omeka_Controller_Exception_404');
        $this->dispatch($url);
    }

    /**
     * Tests to check routing system for bad url.
     */
    public function testRoutingBadIdentifier5()
    {
        $url = $this->baseItem . 'Identifier_of_Item_1' . '/' . 'False_Identifier';
        $this->setExpectedException('Zend_Controller_Dispatcher_Exception');
        $this->dispatch($url);
    }

    /**
     * Tests to check routing system for bad url.
     */
    public function testRoutingBadIdentifier6()
    {
        $url = $this->baseItem . 'Fourth/Identifier_of_Item_2';
        $this->setExpectedException('Zend_Controller_Dispatcher_Exception');
        $this->dispatch($url);
    }

    /**
     * Tests to check routing system for bad url.
     */
    public function testRoutingBadIdentifier7()
    {
        $url = $this->baseItem . 'Fourth/Identifier_of_Item_2';
        $this->setExpectedException('Zend_Controller_Dispatcher_Exception');
        $this->dispatch($url);
    }

    /**
     * Tests to check routing system for bad url.
     */
    public function testRoutingBadIdentifier8()
    {
        $url = $this->baseCollection . 'False_Identifier' . '/' . 'Identifier_of_Item_1';
        $this->setExpectedException('Zend_Controller_Dispatcher_Exception');
        $this->dispatch($url);
    }
}
