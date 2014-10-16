<?php

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class AclTest_AnonymousRecordsDeny extends Neatline_Case_Default
{


    protected $_isAdminTest = false;


    public function setUp()
    {
        parent::setUp();
        $this->exhibit = $this->_exhibit();
        $this->record  = $this->_record($this->exhibit);
        $this->_logout();
    }


    /**
     * Anonymous users should not be able to POST new records.
     */
    public function testCannotCreateRecords()
    {
        $this->request->setMethod('POST');
        $this->dispatch('neatline/records');
        $this->assertAction('login');
    }


    /**
     * Anonymous users should not be able to PUT records.
     */
    public function testCannotUpdateRecords()
    {
        $this->_setPut(array());
        $this->dispatch('neatline/records/'.$this->record->id);
        $this->assertAction('login');
    }


    /**
     * Anonymous users should not be able to DELETE records.
     */
    public function testCannotDeleteRecords()
    {
        $this->request->setMethod('DELETE');
        $this->dispatch('neatline/records/'.$this->record->id);
        $this->assertAction('login');
    }


}
