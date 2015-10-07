<?php queue_css_file('style'); ?>

<?php $pageTitle = __('Browse Collections'); echo head(array('title'=>$pageTitle,'bodyclass' => 'collections browse')); ?>

<div id="header">
	<div class="nav">
	<h1>
        <?php echo option('site_title'); ?>
    </h1>
	<?php echo public_nav_main(); ?>
	</div> 
</div>

<div id="primary" class="clearfix"> 
    </br></br>
    <?php echo "Please visit Building History's <a href=/items/browse?collection=1&sort_field=Dublin+Core%2CTitle&sort_dir=a>browse</a> page."; ?>
</div>

<?php echo foot(); ?>