<?php

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>

<!-- Files. -->
<?php if (metadata('item', 'has files')): ?>
  <!-- <h3><?php //echo __('Files'); ?></h3> --!>
  <?php echo files_for_item(); ?>
<?php endif; ?>

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
<?php echo metadata('item', array('Dublin Core', 'Description')); ?>

<hr />

<!-- Link. -->
<?php echo link_to(
  get_current_record('item'), 'show', 'View this item in a new tab', array('target'=>'_blank')
); ?>
