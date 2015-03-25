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

<div id="search-container">
    <?php echo search_form(); ?>
    
    </div>
<?php //echo pagination_links(); ?>

<?php if ($total_results > 0): ?>

<?php
$sortLinks[__('Title')] = 'Dublin Core,Title';
$sortLinks[__('Creator')] = 'Dublin Core,Creator';
$sortLinks[__('Date')] = 'Dublin Core,Date';
?>
<div id="sort-links">
    
    <div id="tags">
        <span class="sort-label"><?php echo __('Filter by: '); ?>
        </span>
        <?php $tags = get_records('Tag',array('sort_field' => 'name', 'sort_dir' => 'a','type' =>       'item', 'public' => true)); ?>
        <?php echo "<a href=/items/browse?collection=1&sort_field=Dublin+Core%2CTitle&sort_dir=a>all  </a>"; ?> 
        <?php echo tag_string($tags); ?>
    </div>
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
	
	 <div class="item-meta">
	<?php echo link_to_item('More images and information', array(), 'show'); ?>
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
