<!-- This item show file was adapted by AS from the code for the Neatline pop-up bubble (see themes/neatlight/neatline/exhibits/item.php) -->

<?php queue_css_file('style'); ?>

<?php
$item_id = metadata('file', 'item_id');
$item = get_record_by_id('item', $item_id);
set_current_record('item', $item);
?>

<?php echo head(array('title' => metadata('item', array('Dublin Core', 'Title')),'bodyclass' => 'items show')); ?>

<div id="header">
<div class="nav">
<h1>IIT Campus Map</h1>
<?php echo public_nav_main(); ?>
</div> 
</div>

<div id="primary"> 

    <h2><?php echo metadata('item', array('Dublin Core','Title')); ?></h2>
	
	<?php echo file_image('fullsize', $file = null); ?>

<!-- display of specific fields, no labels, with checks for existence of values to avoid extra line breaks if element doesn't exist -->
<?php if (metadata('file', array('Dublin Core', 'Title')) !=NULL && metadata('file', array('Dublin Core', 'Date')) !=NULL): ?>
	<br>
	<?php echo rtrim(metadata('file', array('Dublin Core', 'Title'))), ", ", metadata('file', array('Dublin Core', 'Date')); ?> 
<?php else: ?>
	<?php echo metadata('file', array('Dublin Core', 'Title')); ?>
<?php endif; ?>

<?php if (metadata('file', array('Dublin Core', 'Creator')) !=NULL): ?>
    <?php echo rtrim("("), rtrim(metadata('file', array('Dublin Core', 'Creator'))), ")"; ?>
<?php elseif (metadata('file', array('Dublin Core', 'Creator')) ==NULL): ?>
    <?php echo "(photographer unknown)"; ?>
<?php endif; ?>


<?php if (metadata('file', array('Dublin Core', 'Rights')) !=NULL): ?>
	<br>
	<?php echo metadata('file', array('Dublin Core', 'Rights')); ?>
<?php endif; ?>
<br>
    <br>
<hr />

<div id="colophon">
 <?php fire_plugin_hook('public_items_show', array('view' => $this, 'item' => $item)); ?>

<!-- Next/Previous Item linking disabled -->
   <!-- <ul class="item-pagination navigation">
        <li id="previous-item" class="previous"><?php// echo link_to_previous_item_show(); ?></li>
        <li id="next-item" class="next"><?php //echo link_to_next_item_show(); ?></li>
    </ul> -->
	
	<img alt="IIT Logo" title="IIT Logo" src="<?php echo img('IIT_Logo_horiz_186_blk.gif');?>"/>
	
</div>

</div> <!-- End of Primary. -->



 <?php echo foot(); ?>
