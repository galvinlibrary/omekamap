<?php queue_css_file('style'); ?>

<?php $pageTitle = __('Browse Items'); echo head(array('title'=>$pageTitle,'bodyclass' => 'items browse')); ?>

<div id="header">
	<div class="nav">
	<h1>IIT Campus Map</h1>
	<?php echo public_nav_main(); ?>
	</div> 
</div>
<div id="container">
<div id="primary"> 

<h2><?php echo $pageTitle;?> <?php echo __('(%s total)', $total_results); ?></h2>

<?php //echo pagination_links(); ?>

<?php if ($total_results > 0): ?>

<?php
$sortLinks[__('Title')] = 'Dublin Core,Title';
$sortLinks[__('Creator')] = 'Dublin Core,Creator';
$sortLinks[__('Date')] = 'Dublin Core,Date';
?>
<div id="sort-links">
    <span class="sort-label"><?php echo __('Sort by: '); ?></span><?php echo browse_sort_links($sortLinks); ?>
</div>

<?php endif; ?>

<?php foreach (loop('items') as $item): ?>
<div class="item hentry">
	<?php if (metadata('item', 'has thumbnail')): ?>
		<div class="item-img">
		<?php echo link_to_item(item_image('square_thumbnail')); ?>
		</div>
	<?php endif; ?>
    <h3><?php echo metadata('item', array('Dublin Core', 'Title'), array()); ?></h3>
    <div class="item-meta">
    
	<?php if ($creator = metadata('item', array('Dublin Core', 'Creator'), array())): ?>
    <div class="item-meta">
        <?php echo $creator; ?>
    </div>
    <?php endif; ?>
	
	<?php if ($Date = metadata('item', array('Dublin Core', 'Date'), array())): ?>
    <div class="item-meta">
        <?php echo $Date; ?>
    </div>
    <?php endif; ?>

	<?php if ($URL = metadata('item', array('Item Type Metadata','Local URL'), array())): ?>
    <div class="item-meta">
        <?php $LocalURL = metadata('item', array('Item Type Metadata', 'Local URL')); ?>
		<?php echo "<a href='$LocalURL' target='_blank'>See this item on the map</a>"; ?>
    <?php endif; ?>
	</div>
	
	 <div class="item-meta">
	<?php echo link_to_item('Item Record', array(), 'show'); ?>
		</div>
<br>
    <?php fire_plugin_hook('public_items_browse_each', array('view' => $this, 'item' =>$item)); ?>

    </div><!-- end class="item-meta" -->
</div><!-- end class="item hentry" -->
<?php endforeach; ?>
<br>
<?php //echo pagination_links(); ?>

<!-- output linking disabled -->
<!-- <div id="outputs">
    <span class="outputs-label"><?php// echo __('Output Formats'); ?></span>
    <?php// echo output_format_list(false); ?>
</div> -->

<div id="colophon">
<?php fire_plugin_hook('public_items_browse', array('items'=>$items, 'view' => $this)); ?>
<hr class="content" >
<img alt="IIT Logo" title="IIT Logo" src="<?php echo img('IIT_Logo_horiz_186_blk.gif');?>"/>
</div>
</div>
<?php echo foot(); ?>
</div>
