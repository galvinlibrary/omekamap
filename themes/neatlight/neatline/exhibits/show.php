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
<h3><?php echo nl_getExhibitField('title'); ?></h3>
<?php echo public_nav_main(); ?>
</div> 

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
