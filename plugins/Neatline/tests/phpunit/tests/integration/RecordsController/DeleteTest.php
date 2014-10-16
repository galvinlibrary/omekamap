<?php

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class RecordsControllerTest_Delete extends Neatline_Case_Default
{


    /**
     * DELETE should remove a record and return an empty JSON response.
     */
    public function testDelete()
    {

        $exhibit = $this->_exhibit();
        $record1 = $this->_record($exhibit);
        $record2 = $this->_record($exhibit);

        $this->request->setMethod('DELETE');

        $c1 = $this->_records->count();
        $this->dispatch('neatline/records/'.$record2->id);
        $c2 = $this->_records->count();

        // Should delete a record.
        $this->assertEquals($c1-1, $c2);

        // Should delete the correct record.
        $this->assertNotNull($this->_records->find($record1->id));
        $this->assertNull($this->_records->find($record2->id));

        // Should return empty JSON.
        $this->assertEquals(array(), $this->_getResponseArray());

    }


}
