<?php queue_css_file('style'); ?>

<?php echo head(array(
    'title' => metadata('simple_pages_page', 'title'),
    'bodyclass' => 'page simple-page',
    'bodyid' => metadata('simple_pages_page', 'slug')
)); ?>
<div id="primary">
    <h1><?php echo metadata('simple_pages_page', 'title'); ?></h1>
    <?php
    $text = metadata('simple_pages_page', 'text', array('no_escape' => true));
    echo $this->shortcodes($text);
    ?>
	<hr />
</div>

<img alt="IIT Logo" title="IIT Logo" src="<?php echo img('IIT_Logo_horiz_186_blk.gif');?>"/>

<?php echo foot(); ?>
