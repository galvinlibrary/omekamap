<?php

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class NeatlineRecordTest_SaveForm extends Neatline_Case_Default
{


    /**
     * `saveForm` should mass assign the input array to the record.
     */
    public function testAssignFields()
    {

        $r = $this->_record();

        $r->saveForm(array(
            'slug'                  => '1',
            'title'                 => '2',
            'body'                  => '3',
            'coverage'              => 'POINT(4 4)',
            'tags'                  => '5',
            'widgets'               => '6',
            'presenter'             => '7',
            'fill_color'            => '8',
            'fill_color_select'     => '9',
            'stroke_color'          => '10',
            'stroke_color_select'   => '11',
            'fill_opacity'          => '0.12',
            'fill_opacity_select'   => '0.13',
            'stroke_opacity'        => '0.14',
            'stroke_opacity_select' => '0.15',
            'stroke_width'          => '16',
            'point_radius'          => '17',
            'zindex'                => '18',
            'weight'                => '19',
            'start_date'            => '20',
            'end_date'              => '21',
            'after_date'            => '22',
            'before_date'           => '23',
            'point_image'           => '24',
            'min_zoom'              => '25',
            'max_zoom'              => '26',
            'map_zoom'              => '27',
            'map_focus'             => '28'
        ));

        $this->assertEquals('1',            $r->slug);
        $this->assertEquals('2',            $r->title);
        $this->assertEquals('3',            $r->body);
        $this->assertEquals('POINT(4 4)',   $r->coverage);
        $this->assertEquals('5',            $r->tags);
        $this->assertEquals('6',            $r->widgets);
        $this->assertEquals('7',            $r->presenter);
        $this->assertEquals('8',            $r->fill_color);
        $this->assertEquals('9',            $r->fill_color_select);
        $this->assertEquals('10',           $r->stroke_color);
        $this->assertEquals('11',           $r->stroke_color_select);
        $this->assertEquals(0.12,           $r->fill_opacity);
        $this->assertEquals(0.13,           $r->fill_opacity_select);
        $this->assertEquals(0.14,           $r->stroke_opacity);
        $this->assertEquals(0.15,           $r->stroke_opacity_select);
        $this->assertEquals(16,             $r->stroke_width);
        $this->assertEquals(17,             $r->point_radius);
        $this->assertEquals(18,             $r->zindex);
        $this->assertEquals(19,             $r->weight);
        $this->assertEquals('20',           $r->start_date);
        $this->assertEquals('21',           $r->end_date);
        $this->assertEquals('22',           $r->after_date);
        $this->assertEquals('23',           $r->before_date);
        $this->assertEquals('24',           $r->point_image);
        $this->assertEquals(25,             $r->min_zoom);
        $this->assertEquals(26,             $r->max_zoom);
        $this->assertEquals(27,             $r->map_zoom);
        $this->assertEquals('28',           $r->map_focus);

    }


    /**
     * `saveForm` should assign `item_id`.
     */
    public function testAssignItemId()
    {

        $record = $this->_record();
        $record->saveForm(array('item_id' => '1'));

        // Should assign `item_id`.
        $this->assertEquals(1, $record->item_id);

    }


    /**
     * `saveForm` should assign `wms_address` and `wms_layers`.
     */
    public function testAssignWmsFields()
    {

        $record = $this->_record();
        $record->saveForm(array('wms_address'=>'1', 'wms_layers'=>'2'));

        // Should assign WMS fields.
        $this->assertEquals('1', $record->wms_address);
        $this->assertEquals('2', $record->wms_layers);

    }


    /**
     * `saveForm` should cast empty/whitespace strings to NULL.
     */
    public function testCastWhitespaceToNull()
    {

        $record = $this->_record();

        // String field.
        $record->saveForm(array('fill_color' => ''));
        $this->assertNull($record->body);
        $record->saveForm(array('fill_color' => ' '));
        $this->assertNull($record->body);

        // Number field.
        $record->saveForm(array('max_zoom' => ''));
        $this->assertNull($record->max_zoom);
        $record->saveForm(array('max_zoom' => ' '));
        $this->assertNull($record->max_zoom);

    }


    /**
     * CSS rule-sets on the parent exhibit with selectors that are tagged on
     * the record should be updated with the new record values.
     */
    public function testUpdateExhibitStyles()
    {

        $exhibit = $this->_exhibit();
        $exhibit->styles = "
            .tag1 {
              fill-color: 1;
            }
        ";
        $exhibit->save();
        $record = new NeatlineRecord($exhibit);
        $record->tags = 'tag1';

        // Save form with new `fill_color`.
        $record->saveForm(array('fill_color' => '2'));
        $exhibit = $this->_reload($exhibit);

        // Should update CSS.
        $this->assertEquals(
            array('tag1' => array( 'fill_color' => '2')),
            nl_readCSS($exhibit->styles)
        );

    }


    /**
     * The exhibit CSS - newly updated with values from the saved record -
     * should be pushed out to all other records in the exhibit.
     */
    public function testPushStyles()
    {

        $exhibit = $this->_exhibit();
        $exhibit->styles = "
            .tag1 {
              fill-color: 1;
            }
        ";
        $exhibit->save();
        $record1 = new NeatlineRecord($exhibit);
        $record2 = new NeatlineRecord($exhibit);
        $record1->tags = 'tag1';
        $record2->tags = 'tag1';
        $record1->save();
        $record2->save();

        // Save record 1 with new `fill_color`.
        $record1->saveForm(array('fill_color' => '2'));
        $record2 = $this->_reload($record2);

        // Should update record 2.
        $this->assertEquals('2', $record2->fill_color);

    }


    /**
     * When a record is saved with new tags - eg, when the tags string used to
     * be `tag1`, and is changed to `tag1,tag2` - the existing CSS rules for
     * the `tag2` should be applied to the record before it is used to update
     * the exhibit CSS.
     */
    public function testPullStyles()
    {

        $exhibit = $this->_exhibit();
        $exhibit->styles = "
            .tag1 {
              fill-color: 1;
            }
        ";
        $exhibit->save();

        // Record 1 synchronized with CSS.
        $record1 = new NeatlineRecord($exhibit);
        $record1->fill_color = '1';
        $record1->tags = 'tag1';
        $record1->save();

        // Record 2 not synchronized.
        $record2 = new NeatlineRecord($exhibit);
        $record2->fill_color = '2';
        $record2->save();

        // Add `tag1` to record 2, along with un-synchronized style.
        $record2->saveForm(array('tags' => 'tag1', 'fill_color' => '2'));
        $record1 = $this->_reload($record1);
        $record2 = $this->_reload($record2);

        // Record 1 should be unchanged.
        $this->assertEquals('1', $record1->fill_color);

        // Record 2 should pull `tag` styles.
        $this->assertEquals('1', $record2->fill_color);

    }


    /**
     * When data is saved to a new, unsaved record, values from the `all`
     * selector should be pulled to the record before it is used to update the
     * exhibit CSS.
     */
    public function testPullAllTagWhenUnsaved()
    {

        $exhibit = $this->_exhibit();
        $exhibit->styles = "
            .all {
              fill-color: 1;
            }
        ";
        $exhibit->save();

        // Save data to unsaved record.
        $record = new NeatlineRecord($exhibit);
        $record->saveForm(array('fill_color' => '2'));

        // Should pull CSS value.
        $this->assertEquals('1', $record->fill_color);

        // CSS should be unchanged.
        $this->assertEquals(
            array('all' => array( 'fill_color' => '1')),
            nl_readCSS($exhibit->styles)
        );

    }


    /**
     * When data is saved to an existing record, rules from the `all` selector
     * should _not_ be pulled to the record before it is used to update the
     * exhibit CSS. Otherwise, existing values on the exhibit stylesheet would
     * always clobber new values from the form, making it impossible to change
     * any of the fields controlled by `all`.
     */
    public function testNotPullAllTagWhenSaved()
    {

        $exhibit = $this->_exhibit();
        $exhibit->styles = "
            .all {
              fill-color: 1;
            }
        ";
        $exhibit->save();

        // Save data to existing record.
        $record = $this->_record($exhibit);
        $record->saveForm(array('fill_color' => '2'));
        $exhibit = $this->_reload($exhibit);

        // Should not pull CSS value.
        $this->assertEquals('2', $record->fill_color);

        // CSS should be changed.
        $this->assertEquals(
            array( 'all' => array( 'fill_color' => '2')),
            nl_readCSS($exhibit->styles)
        );

    }


}
