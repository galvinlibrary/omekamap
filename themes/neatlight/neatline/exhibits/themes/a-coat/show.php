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

<!-- Exhibit. -->
<div class="exhibit"><?php echo nl_getExhibitMarkup(); ?></div>

<!-- Narrative. -->
<div id="neatline-narrative" class="narrative">
  <?php echo nl_getExhibitField('narrative'); ?>
</div>

<div id="navigation">

  <!-- Back to exhibits browse. -->
  <a href="<?php echo url('neatline'); ?>">
    <span class="arrow">&larr;</span> View All
  </a> •

  <!-- Link to blog post. -->
  <a href="http://dclure.org/?p=3109">
    Read the blog post
  </a> •

  <!-- Credits. -->
  By <a href="https://twitter.com/clured">@clured</a>,
  with <a href="http://neatline.org/">Neatline</a>

</div>

<?php echo foot(); ?>
