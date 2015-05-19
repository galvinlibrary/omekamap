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

    <?php echo file_image('fullsize', $file = null); ?><br>
	<?php // echo file_markup($file, array('imageSize' => 'fullsize', 'linkToFile' => true)); ?>

<!-- file metadata with checks for existence of each field to avoid extra line breaks -->
    
<!-- Title -->
<?php if (metadata('file', array('Dublin Core', 'Title')) !=NULL): ?>
    <strong><?php echo metadata('file', array('Dublin Core', 'Title')); ?></strong>
    </br>
<?php endif; ?>

<!-- Photographer -->
<?php if (metadata('file', array('Dublin Core', 'Creator')) !=NULL): ?>
    <?php // echo rtrim("("), rtrim(metadata('file', array('Dublin Core', 'Creator'))), ")"; ?>
    <?php echo "<strong>Photographer:</strong> ", metadata('file', array('Dublin Core', 'Creator')); ?>
    <br>
<?php elseif (metadata('file', array('Dublin Core', 'Creator')) ==NULL): ?>
    <?php echo "<strong>Photographer:</strong> photographer unknown"; ?>
    <br>
<?php endif; ?>

<!-- Date -->
<?php if (metadata('file', array('Dublin Core', 'Date')) !=NULL): ?>
    <?php echo "<strong>Date:</strong> ", metadata('file', array('Dublin Core', 'Date')); ?>
    <br>
<?php elseif (metadata('file', array('Dublin Core', 'Date')) ==NULL): ?>
    <?php echo "date unknown"; ?>
    <br>
<?php endif; ?>

<!-- Source -->
<?php if (metadata('file', array('Dublin Core', 'Format')) !=NULL): ?>
    <?php echo "<strong>Source:</strong> ", metadata('file', array('Dublin Core', 'Format')); ?>
    <br>
<?php elseif (metadata('file', array('Dublin Core', 'Format')) ==NULL): ?>
<?php endif; ?>

<!-- Archival Collection -->
<?php if (metadata('file', array('Dublin Core', 'Is Part Of')) !=NULL): ?>
    <?php echo "<strong>Archival Collection:</strong> ", metadata('file', array('Dublin Core', 'Is Part Of')); ?>
    <br>
<?php elseif (metadata('file', array('Dublin Core', 'Is Part Of')) ==NULL): ?>
<?php endif; ?>

<?php if (metadata('file', array('Dublin Core', 'Rights')) !=NULL): ?>
	<br>
	<?php echo metadata('file', array('Dublin Core', 'Rights')); ?>
<?php endif; ?>
    <br>
    <br>
    
<?php echo link_to_item("← Back"); ?>
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
