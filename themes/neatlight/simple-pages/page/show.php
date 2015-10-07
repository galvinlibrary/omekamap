<?php queue_css_file('style'); ?>

<?php echo head(array(
    'title' => metadata('simple_pages_page', 'title'),
    'bodyclass' => 'page simple-page',
    'bodyid' => metadata('simple_pages_page', 'slug')
)); ?>

<div id="header">

	<!-- navigation menu -->
	<div class="nav">
	<h1>IIT Campus Map</h1>
	<?php echo public_nav_main(); ?>
	</div> 

</div>

<div id="primary">
    <h2><?php echo metadata('simple_pages_page', 'title'); ?></h2>
    <?php
    $text = metadata('simple_pages_page', 'text', array('no_escape' => true));
    echo $this->shortcodes($text);
    ?>
</div>


<?php echo foot(); ?>
