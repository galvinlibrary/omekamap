<?php

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class FixturesTest_NeatlineMapVectorStyles extends Neatline_Case_Fixture
{


    public function testRecords()
    {

        $record1 = $this->_record($this->exhibit);
        $record2 = $this->_record($this->exhibit);

        $record1->coverage = 'GEOMETRYCOLLECTION(POINT(1 2),POINT(3 4))';
        $record2->coverage = 'GEOMETRYCOLLECTION(POINT(5 6),POINT(7 8))';

        $styles = array(
            'fill_color'            => '1',
            'fill_color_select'     => '2',
            'stroke_color'          => '3',
            'stroke_color_select'   => '4',
            'fill_opacity'          => 0.5,
            'fill_opacity_select'   => 0.6,
            'stroke_opacity'        => 0.7,
            'stroke_opacity_select' => 0.8,
            'stroke_width'          => 9,
            'point_radius'          => 10,
            'point_image'           => '11'
        );

        $record1->setArray($styles);
        $record2->setArray($styles);

        $record1->save();
        $record2->save();

        $this->_writeRecordsApiFixture($this->exhibit,
            'NeatlineMapRenderVectorStyles.json'
        );

    }


}
