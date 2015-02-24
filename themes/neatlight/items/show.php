<!-- This item show file was adapted by AS from the code for the Neatline pop-up bubble (see themes/neatlight/neatline/exhibits/item.php) -->

<?php queue_css_file('style'); ?>

<?php echo head(array('title' => metadata('item', array('Dublin Core', 'Title')),'bodyclass' => 'items show')); ?>

<div id="header">
	
	<!-- Search across collections disabled -->
	<!--<div id="search-container">
            <?php// echo search_form(array('form_attributes' => array('role' => 'search'))); ?>
    </div> -->
	
	<!-- navigation menu -->

<div class="nav">
<h1>IIT Campus Map</h1>
<?php echo public_nav_main(); ?>
</div> 



</div>
<div id="primary"> 

    <h2><?php echo metadata('item', array('Dublin Core','Title')); ?></h2>
	
	<div id="item-images">
        <!-- <?php// echo files_for_item(); ?> -->
		<?php echo item_image_gallery($attrs = array(), $imageType = 'square_thumbnail', $filesShow = true, $item = null); ?> 
		<p>Click on an image to see a larger version</p>

   </div>

<!-- display of specific fields, no labels, with checks for existence of values to avoid extra line breaks if element doesn't exist -->
    <p>
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
<br>
<?php if (metadata('item', array('Dublin Core', 'Alternative Title')) !=NULL): ?>
        <br>
        <?php echo "Formerly/Also Known As:" ; ?>
	<?php echo metadata('item', array('Dublin Core', 'Alternative Title')); ?>
<?php endif; ?>
<br><br>
<?php if (metadata('item', array('Item Type Metadata', 'Local URL')) !=NULL): ?>
	<?php $LocalURL = metadata('item', array('Item Type Metadata', 'Local URL')); ?>
	<?php echo "<a href='$LocalURL' target='_blank'>See this item on the map</a>"; ?>
<?php endif; ?>
<br>
<?php if (metadata('item', array('Item Type Metadata', 'URL')) !=NULL): ?>
<?php $URL = metadata('item', array('Item Type Metadata', 'URL')); ?>
<?php echo "<a href='$URL' target='_blank'>See this location on Google Maps →</a>"; ?>
<?php endif; ?>
</p>



<div id="colophon">
 <?php fire_plugin_hook('public_items_show', array('view' => $this, 'item' => $item)); ?>
<hr />

<!-- Next/Previous Item linking disabled -->
   <!-- <ul class="item-pagination navigation">
        <li id="previous-item" class="previous"><?php// echo link_to_previous_item_show(); ?></li>
        <li id="next-item" class="next"><?php //echo link_to_next_item_show(); ?></li>
    </ul> -->
	
	<img alt="IIT Logo" title="IIT Logo" src="<?php echo img('IIT_Logo_horiz_186_blk.gif');?>"/>
	
</div>

</div> <!-- End of Primary. -->



 <?php echo foot(); ?>
