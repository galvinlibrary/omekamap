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
  <!-- <h3><?php //echo __('Files'); ?></h3> --!>
  <?php //echo files_for_item(); ?>
  <?php //echo item_image_gallery(array('link'=>array('target'=>'_self')), $imageType = 'square_thumbnail', $filesShow = true); ?>
<!-- Display first file for item automatically -->
  <?php echo file_markup($itemFiles[0], array('imageSize'=>'square_thumbnail', 'linkToFile'=>false, 'linkToMetadata'=>true)); ?>
<!-- checks for existence of second file and displays it if it exists -->
  <?php if (isset($files[1])): ?>
<?php echo file_markup($itemFiles[1], array('imageSize'=>'square_thumbnail', 'linkToFile'=>false, 'linkToMetadata'=>true)); ?>
<?php endif; ?>
<?php endif; ?>
</div>

<!-- Texts. -->
<!-- disabling default metadata display -->
<?php //echo all_element_texts('item'); ?>

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
<br><br>
<?php //echo metadata('item', array('Dublin Core', 'Description')); ?>


<hr />

<!-- Link. -->

<?php echo link_to(get_current_record('item'), 'show', 'More images and info'); ?>
