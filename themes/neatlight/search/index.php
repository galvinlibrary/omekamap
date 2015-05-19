<?php queue_css_file('style'); ?>

<?php
$pageTitle = __('Search Results') . ' ' . __('(%s total)', $total_results);
echo head(array('title' => $pageTitle, 'bodyclass' => 'search'));
$searchRecordTypes = get_search_record_types();
?>

<script>
$.fx.speeds._default = 250
$(document).ready(function(){
    /*$("#search-container").hide();*/
    $("#search-toggle").hide();
    $("#search-toggle").on('click', function() { 
	$("#search-container").fadeIn();
    $("#search-toggle").hide();
  });
    $("#collapse-search").on('click', function() { 
	$("#search-container").hide();
    $("#search-toggle").fadeIn();
  });
});
</script>

<div id="header">
	<div class="nav">
	<h1>IIT Campus Map</h1>
	<?php echo public_nav_main(); ?>
	</div> 
</div>

<div id="container">
<div id="primary"> 
    
<div id=search-toggle> 
    <i class="fa fa-search"></i>
    </div>
<div id="search-container">
    <div id="collapse-search"><i class="fa fa-times"></i></div>
    <?php echo search_form(array()); ?>
</div>    

    <h2><?php echo $pageTitle; ?></h2>
    
    <?php echo search_filters(); ?>
<?php if ($total_results): ?>
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
<table id="search-results">
    <thead>
    </thead>
    <tbody>
        <?php $filter = new Zend_Filter_Word_CamelCaseToDash; ?>
        <?php foreach (loop('search_texts') as $searchText): ?>
        <?php $record = get_record_by_id($searchText['record_type'], $searchText['record_id']); ?>
        <?php $recordType = $searchText['record_type']; ?>
        <?php set_current_record($recordType, $record); ?>
        <tr class="<?php echo strtolower($filter->filter($recordType)); ?>">
            <td >
                <?php if ($recordImage = record_image($recordType, 'square_thumbnail')): ?>
                    <?php echo link_to($record, 'show', $recordImage, array('class' => 'image')); ?>
                    <?php else: ?>
                        <img alt="No image available" src="<?php echo img('noimage.gif');?>"/>
                <?php endif; ?>
                <h3><?php echo link_to_item(metadata('item', array('Dublin Core', 'Title')), array(), 'show'); ?></h3>
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
            </td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<?php echo pagination_links(); ?>
<?php else: ?>
<div id="no-results">
    <p><?php echo __('Your query returned no results.');?></p>
</div>
<?php endif; ?>
    </div>
<?php echo foot(); ?>
</div>