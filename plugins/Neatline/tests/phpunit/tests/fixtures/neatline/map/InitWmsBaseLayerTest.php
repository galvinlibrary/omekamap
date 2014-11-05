<?php

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class FixturesTest_NeatlineInitMapWmsBaseLayer extends Neatline_Case_Fixture
{


    public function testExhibit()
    {

        $this->exhibit->wms_address = 'address';
        $this->exhibit->wms_layers  = 'layers';
        $this->exhibit->save();

        $this->_writeExhibitMarkupFixture($this->exhibit,
            'NeatlineMapInitWmsBaseLayer.html'
        );

    }


}
