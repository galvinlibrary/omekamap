<?php queue_css_file('style'); ?>

<?php
$item_id = metadata('file', 'item_id');
$item = get_record_by_id('item', $item_id);
set_current_record('item', $item);
?>

<?php echo head(array('title' => metadata('item', array('Dublin Core', 'Title')),'bodyclass' => 'items show')); ?>

<script type="text/javascript">
    var $elem = $(".panzoom").panzoom();
    //$(document).ready(function(){
    $(window).load( function() {
    // basic panzoom script
        $(".panzoom").panzoom({
            $reset: $(".reset"),
            $zoomIn: $(".zoom-in"),
            $zoomOut: $(".zoom-out"),
            $zoomRange: $(".zoom-range"),
            contain: "invert",
            increment: 0.125,
            minScale: 1,
            maxScale: 1.75,
        });
        //script to allow focal mousewheel scrolling
       $(".panzoom").on('mousewheel.focal', function(e) {
        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        $(".panzoom").panzoom('zoom', zoomOut, {
          increment: 0.125,
          animate: false,
          focal: e
        });
      });
    });
</script>

<div id="header">
<div class="nav">
<h1>
        <?php echo option('site_title'); ?>
    </h1>
<?php echo public_nav_main(); ?>
</div> 
</div>

<div id="primary"> 
    <div id="panzoom">

    <?php echo file_image('fullsize', array('class' => 'panzoom'), $file = null); ?><br>
         <section class="panzoom-buttons">

  <button title="zoom out" class="zoom-out"></button>
  <input type="range" class="zoom-range" min="0.4" max="5" step="0.05"/>
  <button title="zoom in" class="zoom-in"></button>
  <button title="reset to original view" class="reset"></button>
</section>

        
    </div>
    


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
    <?php echo "<strong>Date:</strong> date unknown"; ?>
    <br>
<?php endif; ?>

<!-- Source -->
<?php if (metadata('file', array('Dublin Core', 'Format')) !=NULL): ?>
    <?php echo "<strong>Original format:</strong> ", metadata('file', array('Dublin Core', 'Format')); ?>
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

 <?php fire_plugin_hook('public_items_show', array('view' => $this, 'item' => $item)); ?>

</div> <!-- End of Primary. -->

 <?php echo foot(); ?>



