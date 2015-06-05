<?php
/**
 * BulkMetadataEditor Bulk Metadata Search and Replace
 *
 * This Omeka 2.1+ plugin is intended to expedite the 
 * process of editing metadata in Omeka collections of 
 * digital objects by providing tools for administrators 
 * to edit many items at once based on prespecified rules.
 *
 * @copyright Copyright 2014 UCSC Library Digital Initiatives
 * @license http://www.gnu.org/licenses/gpl-3.0.txt GNU GPLv3
 */

//require_once dirname(__FILE__) . '/helpers/BulkMetadataEditorFunctions.php';

/**
 * BulkMetadataEditor plugin class.
 *
 * The main class of the BulkMetadataEditor bulk search and replace 
 * plugin for Omeka 2.1+
 */
class BulkMetadataEditorPlugin extends Omeka_Plugin_AbstractPlugin
{
    /**
     * @var array Hooks for the plugin.
     */
    protected $_hooks = array('define_acl','admin_head');

    /**
     * @var array Filters for the plugin.
     */
    protected $_filters = array('admin_navigation_main');

    /**
     * Queue css and javascript files when admin section loads
     *
     *@return void
     */
    public function hookAdminHead()
    {
      queue_js_file('BulkMetadataEditor');
      queue_css_file('BulkMetadataEditor');
    }

    /**
     * Define the plugin's access control list.
     *
     * Add a new resource to the access control list
     * corresponding the the metadata editing page
     *
     *@param array $args Parameters sent to the plugin hook
     *@return void
     */
    public function hookDefineAcl($args)
    {
        $args['acl']->addResource('BulkMetadataEditor_Index');
    }

   
    /**
     * Add the BulkMetadataEditor link to the admin main navigation.
     * 
     * @param array $nav Navigation array.
     * @return array $nav Filtered navigation array.
     */
    public function filterAdminNavigationMain($nav)
    {
        $nav[] = array(
            'label' => __('Bulk Editor'),
            'uri' => url('bulk-metadata-editor'),
            'resource' => 'BulkMetadataEditor_Index',
            'privilege' => 'index'
        );
        return $nav;
    }
    
}
