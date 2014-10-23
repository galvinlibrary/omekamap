<?php queue_css_file('style'); ?>

<?php echo head(array(
    'title' => metadata('simple_pages_page', 'title'),
    'bodyclass' => 'page simple-page',
    'bodyid' => metadata('simple_pages_page', 'slug')
)); ?>

<div id="header">

	<!-- navigation menu -->
	<div class="nav">
	<h3>IIT Campus Map</h3>
	<?php echo public_nav_main(); ?>
	</div> 

</div>

<div id="primary">
    <h1><?php echo metadata('simple_pages_page', 'title'); ?></h1>
    <?php
    $text = metadata('simple_pages_page', 'text', array('no_escape' => true));
    echo $this->shortcodes($text);
    ?>
	<hr />
</div>
<div id="colophon">
<img alt="IIT Logo" title="IIT Logo" src="<?php echo img('IIT_Logo_horiz_186_blk.gif');?>"/>
</div>


<?php echo foot(); ?>
