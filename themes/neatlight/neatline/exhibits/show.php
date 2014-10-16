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

<!-- Exhibit -->

<div class="exhibit"> 
	
	<!--custom navigation menu -->
<!-- <div class="nav">
<?php //$navArray = array(); 
//$navArray[] = array('label'=>'Map', 'uri'=>url('/')); 
//$navArray[] = array('label'=>'Browse Locations', 'uri'=>url('/items/browse?collection=1&sort_field=Dublin+Core%2CTitle&sort_dir=a')); 
//$navArray[] = array('label' =>'About', 'uri'=>url('about')); ?>
<?php //echo nav($navArray); ?>
</div> -->

  <?php echo nl_getExhibitMarkup(); ?>
</div> 

<div id="neatline-narrative" class="narrative">

  <!-- Back Link -->
  <!--<a href="<?php //echo url('neatline'); ?>" class="back">
    <span class="arrow">&larr;</span> View all Exhibits
  </a> -->

  <!-- Narrative -->
  <h1 class="title"><?php echo nl_getExhibitField('title'); ?></h1>
  <?php echo nl_getExhibitField('narrative'); ?>

  <!-- Colophon -->
  <?php echo common('colophon'); ?>

</div>

<?php echo foot();

echo <<<END
<script>
$('.timeline-band').css('width', '40%');

</script>
END;
?>
