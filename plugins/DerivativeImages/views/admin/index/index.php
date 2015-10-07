<?php
$head = array('title' => __('Derivative Images'));
echo head($head);
echo flash();
?>
<form method="post">
<section class="seven columns alpha">
    <p><?php echo __(
      'Omeka attempts to create fullsize, thumbnail, and square thumbnail derivative ' 
    . 'images when a file is added. This plugin recreates (or creates) derivative images ' 
    . 'according to the size constraints set in the %sAppearance settings%s. This plugin ' 
    . 'is useful if image sizes must change for a new theme, after upgrading from an ' 
    . 'earlier version of Omeka, or after your server\'s %sImageMagick%s software has ' 
    . 'been upgraded.', 
    '<a href="' . url('appearance/edit-settings') . '">', '</a>', 
    '<a href="http://www.imagemagick.org/script/index.php">', '</a>'); ?></p>
    <p><?php echo __(
      'Please note that Omeka is unable to create derivative images for some files. We ' 
    . 'highly recommend that you back up Omeka\'s files directory before running this ' 
    . 'process.'); ?></p>
    <div class="field">
        <div class="two columns alpha">
            <label><?php echo __('Process type'); ?></label>
        </div>
        <div class="inputs five columns omega">
            <p class="explanation"><?php echo __('Select files for creating new derivative images.'); ?></p>
            <label><input type="radio" name="process_type" value="all" checked="checked"/> <?php echo __('All files'); ?></label>
            <label><input type="radio" name="process_type" value="has_derivative" /> <?php echo __('Files that have derivative images'); ?></label>
            <label><input type="radio" name="process_type" value="has_no_derivative" /> <?php echo __('Files that do not have derivative images'); ?></label>
        </div>
    </div>
    <div class="field">
        <div class="two columns alpha">
            <label><?php echo __('Image sizes'); ?></label>
        </div>
        <div class="inputs five columns omega">
            <p class="explanation"><?php echo __(
              'Select which image sizes you want to create. Checking none will create all ' 
            . 'image sizes. (Sizes listed here are set in the %sAppearance settings%s.)', 
            '<a href="' . url('appearance/edit-settings') . '">', '</a>'); ?></p>
            <label><input type="checkbox" name="derivative_types[]" value="fullsize" /> <?php echo __('Fullsize'); ?> (<?php echo get_option('fullsize_constraint'); ?> <?php echo __('pixels'); ?>)</label>
            <label><input type="checkbox" name="derivative_types[]" value="thumbnail" /> <?php echo __('Thumbnail'); ?> (<?php echo get_option('thumbnail_constraint'); ?> <?php echo __('pixels'); ?>)</label>
            <label><input type="checkbox" name="derivative_types[]" value="square_thumbnail" /> <?php echo __('Square thumbnail'); ?> (<?php echo get_option('square_thumbnail_constraint'); ?> <?php echo __('pixels'); ?>)</label>
        </div>
    </div>
    <div class="field">
        <div class="two columns alpha">
            <label><?php echo __('MIME types'); ?></label>
        </div>
        <div class="inputs five columns omega">
            <p class="explanation"><?php echo __(
              'Select which file MIME types you want to process. Checking none will process ' 
            . 'all MIME types. (This list represents every MIME type currently available ' 
            . 'in this Omeka site.)'); ?></p>
            <?php foreach ($this->mime_types as $mime_type): ?>
            <label><input type="checkbox" name="mime_types[]" value="<?php echo htmlentities($mime_type); ?>" /> <?php echo $mime_type; ?></label>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<section class="three columns omega">
    <div id="save" class="panel">
        <?php echo $this->formSubmit('submit_file_process', __('Process Files'), array('class'=>'submit big green button')); ?>
    </div>
</section>
</form>
<?php echo foot(); ?>
