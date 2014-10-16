<?php

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class HelpersTest_GetLayers extends Neatline_Case_Default
{


    public function setUp()
    {
        parent::setUp();
        $this->_mockLayers();
    }


    /**
     * `nl_getLayers` should parse the JSON in the passed file.
     */
    public function testGetLayers()
    {
        $this->assertEquals(array(
            'Group1' => array(
                array(
                    'title' => 'Layer 1',
                    'id'    => 'Layer1',
                    'type'  => 'Type1'
                ),
                array(
                    'title' => 'Layer 2',
                    'id'    => 'Layer2',
                    'type'  => 'Type2'
                )
            ),
            'Group2' => array(
                array(
                    'title' => 'Layer 3',
                    'id'    => 'Layer3',
                    'type'  => 'Type3'
                ),
                array(
                    'title' => 'Layer 4',
                    'id'    => 'Layer4',
                    'type'  => 'Type4'
                )
            ),
            'Group3' => array(
                array(
                    'title' => 'Layer 5',
                    'id'    => 'Layer5',
                    'type'  => 'Type5'
                ),
                array(
                    'title' => 'Layer 6',
                    'id'    => 'Layer6',
                    'type'  => 'Type6'
                )
            )
        ), nl_getLayers());
    }


}
