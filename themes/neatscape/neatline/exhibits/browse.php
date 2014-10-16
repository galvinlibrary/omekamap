<?php

$title = __('Neatline | Browse Exhibits');

echo head(array(
  'title' => $title,
  'content_class' => 'neatline'
)); ?>

<div id="primary">

  <?php echo flash(); ?>
  <h1><?php echo $title; ?></h1>

  <?php if (nl_exhibitsHaveBeenCreated()): ?>

    <div class="pagination"><?php echo pagination_links(); ?></div>

      <?php foreach (loop('NeatlineExhibit') as $e): ?>
        <h2>
          <?php echo nl_getExhibitLink(
            $e, 'show', nl_getExhibitField('title'),
            array('class' => 'neatline'), true
          );?>
        </h2>
        <?php if ($description = snippet_by_word_count(nl_getExhibitField('narrative'), 20)) : ?>
        <div class="neatline-exhibit-description"><?php echo $description . nl_getExhibitLink($e, 'show', 'Read more.', array('class' => 'neatline'), true); ?></div>
        <?php endif; ?>
      <?php endforeach; ?>

    <div class="pagination"><?php echo pagination_links(); ?></div>

  <?php endif; ?>

</div>

<?php echo foot(); ?>
