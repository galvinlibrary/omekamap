<?php

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class FixturesTest_NeatlineMapInitImageBaseLayer extends Neatline_Case_Fixture
{


    public function testExhibit()
    {

        $this->exhibit = $this->_exhibit();
        $this->exhibit->image_layer = NL_TEST_DIR.'/mocks/image.jpg';
        $this->exhibit->zoom_levels = 50;
        $this->exhibit->save();

        $this->_writeExhibitMarkupFixture($this->exhibit,
            'NeatlineMapInitImageBaseLayer.html'
        );

    }


}
