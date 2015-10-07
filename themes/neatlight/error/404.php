<?php queue_css_file('style'); ?>

<?php echo head(array('title'=>'404','bodyid'=>'404')); ?>

<div id="header">
	<div class="nav">
	<h1>
        <?php echo option('site_title'); ?>
    </h1>
	<?php echo public_nav_main(); ?>
	</div> 
</div>

<div id="primary">
    <br><br>
    <h1>404 - Page Not Found</h1>
<h3>You seem to be lost. Please visit Building History <a href="http://buildinghistory.iit.edu">here</a>.</h3>

</div>

<?php echo foot(); ?>