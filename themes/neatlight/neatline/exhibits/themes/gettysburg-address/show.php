<?php

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

<!-- Exhibit -->
<div class="exhibit">
  <?php echo nl_getExhibitMarkup(); ?>
</div>

<!-- Narrative -->
<div id="neatline-narrative" class="narrative">
  <?php echo nl_getExhibitField('narrative'); ?>
</div>

<?php echo foot(); ?>
