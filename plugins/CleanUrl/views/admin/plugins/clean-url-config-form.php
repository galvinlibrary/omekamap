<style type="text/css">
    ul.checkboxes {
        list-style: none;
        margin-left: 5px;
        padding-left: 0;
    }
</style>
<p>
<?php
    echo __('"CleanUrl" plugin allows to have clean, readable and search engine optimized Urls like http://example.com/my_collection/item_identifier.') . '<br />';
    echo __('See %s for more information.', '<a href="https://github.com/Daniel-KM/CleanUrl">ReadMe</a>');
?>
</p>
<fieldset id="fieldset-identifiers"><legend><?php echo __('Identifiers'); ?></legend>
    <div class="field">
        <div class="two columns alpha">
            <?php echo $view->formLabel('clean_url_identifier_element', __('Field where id is saved')); ?>
        </div>
        <div class='inputs five columns omega'>
            <?php
                $elements = get_table_options('Element', null, array(
                    'record_types' => array(null, 'All'),
                    'sort' => 'alphaBySet',
                ));
                // Remove the "Select Below" label.
                unset($elements['']);
                echo $this->formSelect('clean_url_identifier_element',
                    get_option('clean_url_identifier_element'),
                    array(),
                    $elements);
            ?>
            <p class="explanation">
                <?php echo __('Field where to save the identifier of the item or file.');
                echo ' ' . __('It should be an identifier used for all record types (Collection, Item and File).');
                echo ' ' . __('Default is to use "Dublin Core:Identifier".'); ?>
            </p>
        </div>
    </div>
    <div class="field">
        <div class="two columns alpha">
            <?php echo $view->formLabel('clean_url_identifier_prefix', __('Prefix of identifiers to use')); ?>
        </div>
        <div class='inputs five columns omega'>
            <?php echo $view->formText('clean_url_identifier_prefix', get_option('clean_url_identifier_prefix'), NULL); ?>
            <p class="explanation">
                <?php echo __('Urls are built with the sanitized Dublin Core identifier with the selected prefix, for example "item:", "record:" or "doc =". Let empty to use simply the first identifier.') . '<br />'; ?>
                <?php echo __('If this identifier does not exists, the Omeka item id will be used.'); ?>
            </p>
        </div>
    </div>
    <div class="field">
        <div class="two columns alpha">
            <?php echo $view->formLabel('clean_url_case_insensitive', __('Allow case insensitive identifier')); ?>
        </div>
        <div class='inputs five columns omega'>
            <?php echo $view->formCheckbox('clean_url_case_insensitive', TRUE, array('checked' => (boolean) get_option('clean_url_case_insensitive'))); ?>
            <p class="explanation">
                <?php echo __('If checked, all items will be available via an insensitive url too. This option is generally useless, because searches in database are generally case insensitive by default.') . '<br />'; ?>
                <?php echo __('Furthermore, it can slow server responses, unless you add an index for lower texts.'); ?>
            </p>
        </div>
    </div>
</fieldset>
<fieldset id="fieldset-main-path"><legend><?php echo __('Main base path'); ?></legend>
    <div class="field">
        <div class="two columns alpha">
            <?php echo $view->formLabel('clean_url_main_path', __('Main path to add')); ?>
        </div>
        <div class='inputs five columns omega'>
            <?php echo $view->formText('clean_url_main_path', get_option('clean_url_main_path'), NULL); ?>
            <p class="explanation">
                <?php echo __('The main path to add in the beginning of the url, for example "collections/", "library/" or "archives/".'); ?>
                <?php echo __('Let empty if you do not want any.'); ?>
            </p>
        </div>
    </div>
</fieldset>
<fieldset id="fieldset-collections"><legend><?php echo __('Collections'); ?></legend>
    <div class="field">
        <div class="two columns alpha">
            <?php echo $view->formLabel('clean_url_collection_generic', __('Generic name to add before collection identifier')); ?>
        </div>
        <div class='inputs five columns omega'>
            <?php echo $view->formText('clean_url_collection_generic', get_option('clean_url_collection_generic'), NULL); ?>
            <p class="explanation">
                <?php echo __('This main path is added before the collection name, for example "/ my_collections / collection identifier".'); ?>
                <?php echo __('Let empty if you do not want any, so path will be "/ collection identifier".'); ?>
            </p>
        </div>
    </div>
</fieldset>
<fieldset id="fieldset-items"><legend><?php echo __('Items'); ?></legend>
    <div class="field">
        <div class="two columns alpha">
            <?php echo $view->formLabel('clean_url_item_default', __('Default url of items')); ?>
        </div>
        <div class='inputs five columns omega'>
            <?php
            $checkboxes = array(
                'generic' => '/ generic / item identifier',
                'collection' => '/ collection identifier / item identifier',
            );
            echo $view->formRadio('clean_url_item_default', get_option('clean_url_item_default'), NULL, $checkboxes); ?>
            <p class="explanation">
                <?php echo __('Select the default format of the url for items.'); ?>
            </p>
        </div>
    </div>
    <div class="field">
        <div class="two columns alpha">
            <?php echo $view->formLabel('clean_url_item_alloweds', __('Allowed urls for items')); ?>
        </div>
        <div class='inputs five columns omega'>
            <ul class="checkboxes">
                <?php
                $alloweds = unserialize(get_option('clean_url_item_alloweds'));
                foreach ($checkboxes as $key => $label):
                    echo '<li>';
                    echo $view->formCheckbox('clean_url_item_alloweds[]', $key,
                        array('checked' => in_array($key, $alloweds) ? 'checked' : ''));
                    echo $label;
                    echo '</li>';
                endforeach;
                ?>
            </ul>
            <p class="explanation">
                <?php echo __('Select the allowed formats for urls of items.');
                echo ' ' . __('This is useful to allow a permalink and a search engine optimized link.'); ?>
            </p>
        </div>
    </div>
    <div class="field">
        <div class="two columns alpha">
            <?php echo $view->formLabel('clean_url_item_generic', __('Generic name to add before item identifier')); ?>
        </div>
        <div class='inputs five columns omega'>
            <?php echo $view->formText('clean_url_item_generic', get_option('clean_url_item_generic'), NULL); ?>
            <p class="explanation">
                <?php echo __('The generic name to use if generic identifier is selected above, for example "item/", "record/" or "doc/".'); ?>
            </p>
        </div>
    </div>
</fieldset>
<fieldset id="fieldset-files"><legend><?php echo __('Files'); ?></legend>
    <div class="field">
        <div class="two columns alpha">
            <?php echo $view->formLabel('clean_url_file_default', __('Default url of files')); ?>
        </div>
        <div class='inputs five columns omega'>
            <?php
            $checkboxes = array(
                'generic' => '/ generic / file identifier',
                'generic_item' => '/ generic / item identifier / file identifier',
                'collection' => '/ collection identifier / file identifier',
                'collection_item' => '/ collection identifier / item identifier / identifier',
            );
            echo $view->formRadio('clean_url_file_default', get_option('clean_url_file_default'), NULL, $checkboxes); ?>
            <p class="explanation">
                <?php echo __('Select the default format of the url for files.'); ?>
            </p>
        </div>
    </div>
    <div class="field">
        <div class="two columns alpha">
            <?php echo $view->formLabel('clean_url_file_alloweds', __('Allowed urls for files')); ?>
        </div>
        <div class='inputs five columns omega'>
            <ul class="checkboxes">
                <?php
                $alloweds = unserialize(get_option('clean_url_file_alloweds'));
                foreach ($checkboxes as $key => $label):
                    echo '<li>';
                    echo $view->formCheckbox('clean_url_file_alloweds[]', $key,
                        array('checked' => in_array($key, $alloweds) ? 'checked' : ''));
                    echo $label;
                    echo '</li>';
                endforeach;
                ?>
            </ul>
            <p class="explanation">
                <?php echo __('Select the allowed formats for urls of files.');
                echo ' ' . __('This is useful to allow a permalink and a search engine optimized link.'); ?>
            </p>
        </div>
    </div>
    <div class="field">
        <div class="two columns alpha">
            <?php echo $view->formLabel('clean_url_file_generic', __('Generic name to add before file identifier')); ?>
        </div>
        <div class='inputs five columns omega'>
            <?php echo $view->formText('clean_url_file_generic', get_option('clean_url_file_generic'), NULL); ?>
            <p class="explanation">
                <?php echo __('The generic name to use if generic identifier is selected above, for example "file/", "record/" or "image/".'); ?>
                <?php echo __('In the first case, currently, it should be different from the name used for items.'); ?>
            </p>
        </div>
    </div>
</fieldset>
<fieldset id="fieldset-display"><legend><?php echo __('Display'); ?></legend>
    <div class="field">
        <div class="two columns alpha">
            <?php echo $view->formLabel('clean_url_display_admin_browse_identifier', __('Display identifier in admin items/browse')); ?>
        </div>
        <div class='inputs five columns omega'>
            <?php echo $view->formCheckbox('clean_url_display_admin_browse_identifier', TRUE, array('checked' => (boolean) get_option('clean_url_display_admin_browse_identifier'))); ?>
            <p class="explanation">
                <?php echo __('If checked, the identifier of each item will be displayed in the admin items browse page.'); ?>
            </p>
        </div>
    </div>
</fieldset>
