<?php
/**
 * Clean Url Get Record Full Identifier
 *
 * @todo Use a route name?
 *
 * @see Omeka\View\Helper\RecordUrl.php
 *
 * @copyright Copyright 2007-2012 Roy Rosenzweig Center for History and New Media
 * @license http://www.gnu.org/licenses/gpl-3.0.txt GNU GPLv3
 */

/**
 * @package Omeka\Plugins\CleanUrl\views\helpers
 */
class CleanUrl_View_Helper_GetRecordFullIdentifier extends Zend_View_Helper_Abstract
{
    /**
     * Get clean url path of a record.
     *
     * @param Record $record
     * @param boolean $withMainPath
     * @param string $withBasePath Can be empty, 'admin', 'public' or
     * 'current'. If any, implies main path.
     * @param boolean $absoluteUrl If true, implies current / admin or public
     * path and main path.
     * @param string $format Format of the identifier (default one if empty).
     *
     * @return string
     *   Full identifier of the record, if any, else empty string.
     */
    public function getRecordFullIdentifier(
        $record,
        $withMainPath = true,
        $withBasePath = 'current',
        $absolute = false,
        $format = null)
    {
        switch (get_class($record)) {
            case 'Collection':
                $identifier = $this->view->getRecordIdentifier($record);
                if (empty($identifier)) {
                    return '';
                }

                $generic = get_option('clean_url_collection_generic');

                return $this->_getUrlPath($absolute, $withBasePath, $withMainPath) . $generic . $identifier;
                break;

            case 'Item':
                $identifier = $this->view->getRecordIdentifier($record);
                if (empty($identifier)) {
                    $identifier = $record->id;
                }

                if (empty($format)) {
                    $format = get_option('clean_url_item_default');
                }

                switch ($format) {
                    case 'generic':
                        $generic = get_option('clean_url_item_generic');
                        return $this->_getUrlPath($absolute, $withBasePath, $withMainPath) . $generic . $identifier;

                    case 'collection':
                        $collection = $record->getCollection();
                        $collection_identifier = $this->view->getRecordIdentifier($collection);
                        if (!$collection_identifier) {
                            return '';
                        }
                        return $this->_getUrlPath($absolute, $withBasePath, $withMainPath) . $collection_identifier . '/' . $identifier;
                }
                break;

            case 'File':
                $identifier = $this->view->getRecordIdentifier($record);
                if (empty($identifier)) {
                    $identifier = $record->id;
                }

                if (empty($format)) {
                    $format = get_option('clean_url_file_default');
                }

                switch ($format) {
                    case 'generic':
                        $generic = get_option('clean_url_file_generic');
                        return $this->_getUrlPath($absolute, $withBasePath, $withMainPath) . $generic . $identifier;

                    case 'generic_item':
                        $generic = get_option('clean_url_file_generic');

                        $item = $record->getItem();
                        $item_identifier = $this->view->getRecordIdentifier($item);
                        if (!$item_identifier) {
                            $item_identifier = $item->id;
                        }
                        return $this->_getUrlPath($absolute, $withBasePath, $withMainPath) . $generic . $item_identifier . '/' . $identifier;

                    case 'collection':
                        $item = $record->getItem();
                        $collection = $item->getCollection();
                        $collection_identifier = $this->view->getRecordIdentifier($collection);
                        if (!$collection_identifier) {
                            return '';
                        }
                        return $this->_getUrlPath($absolute, $withBasePath, $withMainPath) . $collection_identifier . '/' . $identifier;

                    case 'collection_item':
                        $item = $record->getItem();
                        $collection = $item->getCollection();
                        $collection_identifier = $this->view->getRecordIdentifier($collection);
                        if (!$collection_identifier) {
                            return '';
                        }
                        $item_identifier = $this->view->getRecordIdentifier($item);
                        if (!$item_identifier) {
                            $item_identifier = $item->id;
                        }
                        return $this->_getUrlPath($absolute, $withBasePath, $withMainPath) . $collection_identifier . '/' . $item_identifier . '/' . $identifier;
                }
                break;
        }

        // This record don't have a clean url.
        return '';
    }

    /**
     * Return beginning of the record name if needed.
     *
     * @param boolean $withBasePath Implies main path.
     * @param boolean $withMainPath
     *
     * @return string
     * The string ends with '/'.
     */
    protected function _getUrlPath($absolute, $withBasePath, $withMainPath)
    {
        if ($absolute) {
            $withBasePath = empty($withBasePath) ? 'current' : $withBasePath;
            $withMainPath = true;
        }
        elseif ($withBasePath) {
            $withMainPath = true;
        }

        switch ($withBasePath) {
            case 'public': $basePath = PUBLIC_BASE_URL; break;
            case 'admin': $basePath = ADMIN_BASE_URL; break;
            case 'current': $basePath = CURRENT_BASE_URL; break;
            default: $basePath = '';
        }

        $mainPath = $withMainPath ? get_option('clean_url_main_path') : '';

        return ($absolute ? get_view()->serverUrl() : '') . $basePath . '/' . $mainPath;
    }
}
