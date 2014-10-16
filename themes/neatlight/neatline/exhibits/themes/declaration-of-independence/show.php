<?php

/* vim: set linebreak wrap nolist tabstop=2 shiftwidth=2 softtabstop=2: */

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>

<?php echo head(array(
  'title' => nl_getExhibitField('title'),
  'bodyclass' => 'neatline show'
)); ?>

<!-- Transcription. -->
<div id="neatline-narrative" class="narrative">

  <header class="credits">
    <?php include('credits.php'); ?>
    <div id="tutorial-button"></div>
  </header>

  <hr />

  <?php include('declaration.php'); ?>
  <?php include('tutorial.php'); ?>

</div>

<!-- Exhibit. -->
<div class="exhibit">
  <?php echo nl_getExhibitMarkup(); ?>
</div>

<!-- React. -->
<div id="toggle"></div>
<div id="zoom"></div>

<?php echo foot(); ?>
