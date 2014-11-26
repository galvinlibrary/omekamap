<?php

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>

<?php queue_css_file('style'); ?>
<?php queue_js_file('show'); ?>

<?php echo head(array(
  'title' => nl_getExhibitField('title'),
  'bodyclass' => 'neatline show'
)); ?>


<!-- navigation menu -->
<div class="nav">
<img alt="Plus Sign" title="Maximize this Div" width=25px height=25px id="navx" src="<?php echo img('info.gif');?>"/>
<h1><?php echo nl_getExhibitField('title'); ?></h1>
<?php echo public_nav_main(); ?>


</div> 

<script>
$(document).ready(function(){
  $(".nav").on('click', function(e) { 
   if( e.target !== $("#navx")[0]) 
       return;
	$(".nav2").fadeIn();
	$(".welcome").fadeOut();
  });
});

</script>

<div class="welcome">
    <div class="arrow">
    <img  alt="Arrow" title="arrow" src="<?php echo img('arrowred.svg');?>"/>
    </div>
    <p>Welcome to the interactive IIT campus map. Click the i in the upper right corner of the screen to learn more about the map and how to use it. </p>

<img alt="Minus Sign" title="Minimize this Div" width=25px height=25px src="<?php echo img('x.gif');?>"/>
</div>

<div class="nav2">
<p><?php echo nl_getExhibitField('narrative'); ?></p>
<img alt="Minus Sign" title="Minimize this Div" id="nav2x" width=25px height=25px src="<?php echo img('x.gif');?>"/>
</div> 

<script>
$(document).ready(function(){
  $(".welcome").click(function(){
    $(this).fadeOut();
  });
});
$(document).ready(function(){
  $(".nav2").on('click', function(e) { 
   if( e.target !== $("#nav2x")[0]) 
       return;
	$(".nav2").fadeOut();
  });
});
$(document).ready(function(){
  $("#OpenLayers_Map_4_OpenLayers_ViewPort").click(function(){
    $(".nav2").fadeOut();
  });
});
$(document).ready(function(){
  $("#OpenLayers_Map_4_OpenLayers_ViewPort").click(function(){
    $(".welcome").fadeOut();
  });
});
</script>

<!-- Exhibit -->

<div class="exhibit"> 
	

  <?php echo nl_getExhibitMarkup(); ?>
    
</div> 

  <!-- Narrative -->
<div id="neatline-narrative" class="narrative">
    
  <!-- Colophon -->
  <!-- <?php// echo common('colophon'); ?> -->

</div>

<?php echo foot();

echo <<<END
<script>
$('.timeline-band').css('width', '40%');

</script>
END;
?>
