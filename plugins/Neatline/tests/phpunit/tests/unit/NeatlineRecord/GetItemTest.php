<?php

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class NeatlineRecordTest_GetItem extends Neatline_Case_Default
{


    /**
     * `getItem` should return the parent item.
     */
    public function testGetItem()
    {

        $item   = $this->_item();
        $record = new NeatlineRecord(null, $item);

        $retrieved = $record->getItem();
        $this->assertEquals($item->id, $retrieved->id);

    }


}
