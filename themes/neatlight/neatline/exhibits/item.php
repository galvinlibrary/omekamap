<?php

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>



<!-- Files. -->
<div id="item-images">
<?php if (metadata('item', 'has files')): ?>
<?php $itemFiles = $item->Files; ?>
<!-- Display first file for item automatically -->
  <?php echo file_markup($itemFiles[0], array('imageSize'=>'square_thumbnail', 'linkToFile'=>false, 'linkToMetadata'=>false)); ?>
<!-- checks for existence of second file and displays it if it exists -->
  <?php if (isset($itemFiles[1])): ?>
  <?php echo file_markup($itemFiles[1], array('imageSize'=>'square_thumbnail', 'linkToFile'=>false, 'linkToMetadata'=>false)); ?>
  <?php endif; ?>
    <!-- If items has no files, show the 'No Image Available' image -->
        <?php elseif (metadata('item', 'has files') == NULL): ?>
            <img alt="No image available" src="<?php echo img('noimage.gif');?>"/>
        
<?php endif; ?>
</div>

<!-- Texts. -->

<!-- display of specific fields, no labels, with checks for existence of values to avoid extra line breaks if element doesn't exist -->
<?php if (metadata('item', array('Dublin Core', 'Creator')) !=NULL): ?>
	<br>
	<?php echo metadata('item', array('Dublin Core', 'Creator')); ?> 
<?php endif; ?>

<?php if (metadata('item', array('Dublin Core', 'Date')) !=NULL): ?>
	<br>
	<?php echo metadata('item', array('Dublin Core', 'Date')); ?>
<?php endif; ?>

<?php if (metadata('item', array('Dublin Core', 'Coverage')) !=NULL): ?>
	<br>
	<?php echo metadata('item', array('Dublin Core', 'Coverage')); ?>
<?php endif; ?>

<?php // if (metadata('item', array('Dublin Core', 'Alternative Title')) !=NULL): ?>
    <!--<span class="smaller_text">
        <br><br>
        <?php //echo 'Formerly/also known as: '; ?>
        <?php //echo metadata('item', array('Dublin Core', 'Alternative Title')); ?>
    </span> --!>
<?php //endif; ?>

<br><br>

<hr />

<!-- Link. -->

<?php echo link_to(get_current_record('item'), 'show', 'See more'); ?>
