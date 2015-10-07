<?php queue_css_file('style'); ?>

<?php echo head(array('title'=>'403','bodyid'=>'403')); ?>

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
    <h1>403 - Access Denied</h1>
<h3>You do not have permission to access this page. Please visit Building History <a href="http://buildinghistory.iit.edu">here</a>.</h3>

</div>

<?php echo foot(); ?>