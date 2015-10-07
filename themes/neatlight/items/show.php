<!-- This item show file was adapted by AS from the code for the Neatline pop-up bubble (see themes/neatlight/neatline/exhibits/item.php) -->

<?php queue_css_file('style'); ?>

<?php echo head(array('title' => metadata('item', array('Dublin Core', 'Title')),'bodyclass' => 'items show')); ?>

<script>
$.fx.speeds._default = 250
$(document).ready(function(){
    $(".collapse").hide();
    $(".expand").on('click', function() { 
	$("#sources").slideDown();
    $(".expand").hide();
    $(".collapse").show();
  });
  $(".collapse").on('click', function() { 
    $("#sources").slideUp();
    $(".collapse").hide();
    $(".expand").show();
});
});
</script>

<div id="header">
	
	<!-- Search across collections disabled -->
	<!--<div id="search-container">
            <?php// echo search_form(array('form_attributes' => array('role' => 'search'))); ?>
    </div> -->
	
	<!-- navigation menu -->

<div class="nav">
<h1>
        <?php echo option('site_title'); ?>
    </h1>
<?php echo public_nav_main(); ?>
</div> 



</div>
<div id="primary"> 

    <h2><?php echo metadata('item', array('Dublin Core','Title')); ?></h2>
	
	<div id="item-images-grid">
		<?php echo item_image_gallery($attrs = array(), $imageType = 'square_thumbnail', $filesShow = true, $item = null); ?> 
        <!-- If items has no files, show the 'No Image Available' image -->
        <?php if (metadata('item', 'has files') == NULL): ?>
            <img alt="No image available" src="<?php echo img('noimage.gif');?>"/>
        <?php endif; ?>
   </div>

    <div id="metadata">
<!-- display of specific fields, no labels, with checks for existence of values to avoid extra line breaks if element doesn't exist -->
    <p>
<?php if (metadata('item', array('Dublin Core', 'Creator')) !=NULL): ?>
     
        <div id="creator"><?php echo metadata('item', array('Dublin Core', 'Creator')); ?></div>
<?php endif; ?>

<?php if (metadata('item', array('Dublin Core', 'Contributor')) !=NULL): ?>
      
	<?php echo metadata('item', array('Dublin Core', 'Contributor')); ?>
        <br>
<?php endif; ?>        
        
<?php if (metadata('item', array('Dublin Core', 'Date')) !=NULL): ?>
	<?php echo metadata('item', array('Dublin Core', 'Date')); ?>
                <br>
<?php endif; ?>

<?php if (metadata('item', array('Dublin Core', 'Coverage')) !=NULL): ?>
	<?php echo metadata('item', array('Dublin Core', 'Coverage')); ?>
        <br>
<?php endif; ?>

<?php if (metadata('item', array('Dublin Core', 'Description')) !=NULL): ?>
        <br>
        <?php echo metadata('item', array('Dublin Core', 'Description')); ?>
        <br>
        <?php endif; ?>
<?php if (metadata('item', array('Dublin Core', 'Alternative Title')) !=NULL): ?>
        <br>
        <?php echo "Formerly/Also Known As:" ; ?>
	<?php echo metadata('item', array('Dublin Core', 'Alternative Title')); ?>
        <br>
<?php endif; ?>
<br>
<?php if (metadata('item', array('Item Type Metadata', 'Local URL')) !=NULL): ?>
    <?php $LocalURL = metadata('item', array('Item Type Metadata', 'Local URL')); ?>
	<?php echo "<a href=/neatline/show/map#records/$LocalURL> See this item on the map</a>"; ?>
        <i class="fa fa-globe"></i>
        <br>
        <?php endif; ?>

<?php if (metadata('item', array('Item Type Metadata', 'URL')) !=NULL): ?>
<?php $URL = metadata('item', array('Item Type Metadata', 'URL')); ?>
<?php echo "<a href='$URL' target='_blank'>See this location on Google Maps  </a>"; ?>
<i class="fa fa-external-link"></i>
<?php endif; ?>
</p>
    <div id="sources-header">
         <div class="expand">See sources <i class="fa fa-plus-circle"></i></div>
         <div class="collapse">Collapse sources <i class="fa fa-minus-circle"></i></div>
    <div id="sources">
    <?php if (metadata('item', array('Dublin Core', 'Source')) !=NULL): ?>
	<?php echo metadata('item', array('Dublin Core', 'Source')); ?>
    
<?php endif; ?>
    </div>
    </div>    
    <br>
    <?php echo "Have a question, correction, or a story that you'd like to share about this building? Contact us at <a href='mailto:digitalcollections@iit.edu'>digitalcollections@iit.edu</a>."; ?>
    <br/>
</div>

</div> <!-- End of Primary. -->

<?php echo foot(); ?>
