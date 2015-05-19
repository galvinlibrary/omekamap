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
<img alt="Information" title="Maximize this Div" width=25px height=25px id="navx" src="<?php echo img('info.gif');?>"/>
<h1><?php echo nl_getExhibitField('title'); ?></h1>
<?php echo public_nav_main(); ?>


</div> 
<script>
$(document).ready(function(){  
 $('.help').hide();
});
</script>

<script>
    $(document).ready(function(){
    var visited = $.cookie('visited')
    if (visited == null) {
        $('.welcome').hide().delay(1000).fadeIn('slow');
    } else {
        $('.welcome').hide();
    }
    $.cookie('visited', 'yes_visited', {
    expires: 365,
    path: '/'
    });
    });
</script>
<script>
$(document).ready(function () {
    $('#navx').click(function () {
        $('#navx').text(function (i, text) {
            return $.trim(text) == 'Hide' ? 'Show' : 'Hide'
        });
        $('.help1, .help2, .help, #darken').fadeToggle(500);
    });
});
</script>


<div class="welcome">
    <p>Welcome to the interactive IIT campus map. Click the ⓘ in the upper right corner of the screen to learn more about the map and how to use it. </p>
</div>

<div class="help1">
<p><?php echo nl_getExhibitField('narrative'); ?></p>
</div> 

<script>
$.fx.speeds._default = 1
$(document).ready(function(){
  $(".welcome").click(function(){
    $(this).fadeOut();
  });
});
$(document).ready(function(){
  $(".help1").on('click', function(e) { 
   if( e.target !== $("#help1x")[0]) 
       return;
	$(".help1").fadeOut();
  });
});
$(document).ready(function(){
  $("#darken, .help1, .help2").click(function() { 
    $(".help1").fadeOut();
    $(".help2").fadeOut();
    $("#darken").fadeOut();
    $('.help').fadeOut();
  });
});
$(document).ready(function(){
  $("#OpenLayers_Map_4_OpenLayers_ViewPort, .nav, #waypoints, #simile").click(function(){
    $(".welcome").fadeOut();
  });
});
</script>

<div class="help2">
<p>Click and drag within the timeline to view the campus throughout history</p>
<img src="<?php echo img('fulltimeline.gif');?>"/>
</div> 

<!-- Exhibit -->

<div class="exhibit"> 
<div id="darken"></div>	

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
