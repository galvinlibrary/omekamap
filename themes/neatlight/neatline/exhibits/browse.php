<?php

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>

<?php queue_css_file('style'); ?>

<?php echo head(array(
  'bodyclass' => 'neatline browse'
)); ?>

<!-- Site Title -->
<p class="title"><?php echo get_option('site_title'); ?></p>

<?php if (nl_exhibitsHaveBeenCreated()): ?>
  <div class="list">

  <!-- Exhibit List -->
  <?php foreach (loop('NeatlineExhibit') as $e): ?>
    <div class="exhibit">

      <span class="title">
        <?php echo nl_getExhibitLink(
          $e, 'show', nl_getExhibitField('title'),
          array('class' => 'neatline'), true
        );?>
      </span> &bull;

      <span class="date">
        <?php echo date('F d Y', strtotime($e->added)); ?>
      </span>

    </div>
  <?php endforeach; ?>

  </div>
<?php endif; ?>

<!-- Colophon -->
<?php echo common('colophon'); ?>

<?php echo foot(); ?>
