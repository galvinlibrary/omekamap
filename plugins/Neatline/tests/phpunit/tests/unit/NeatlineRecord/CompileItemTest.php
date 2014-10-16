<?php

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class NeatlineRecordTest_CompileItem extends Neatline_Case_Default
{


    public function setUp()
    {
        parent::setUp();
        $this->_mockTheme();
    }


    /**
     * `compileItem` should write the "Title" element on the parent item to
     * the `item_title` field.
     */
    public function testCompileItem()
    {

        $exhibit    = $this->_exhibit();
        $item       = $this->_item('title');

        $record = new NeatlineRecord($exhibit, $item);
        $record->save();

        // `item_title` should be set.
        $this->assertEquals('title', $record->item_title);

    }


}
