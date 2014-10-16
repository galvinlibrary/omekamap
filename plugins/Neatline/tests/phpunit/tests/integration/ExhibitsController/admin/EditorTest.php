<?php

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class ExhibitsControllerTest_AdminEditor extends Neatline_Case_Default
{


    /**
     * SHOW should load exhibits by id.
     */
    public function testLoadExhibit()
    {
        $exhibit = $this->_exhibit();
        $this->dispatch('neatline/editor/'.$exhibit->id);
        $this->assertEquals($exhibit->id, nl_getExhibitField('id'));
    }


    /**
     * EDITOR should display editor and exhibit containers.
     */
    public function testBaseMarkup()
    {
        $exhibit = $this->_exhibit();
        $this->dispatch('neatline/editor/'.$exhibit->id);
        $this->assertQuery('#neatline');
        $this->assertQuery('#editor');
    }


}
