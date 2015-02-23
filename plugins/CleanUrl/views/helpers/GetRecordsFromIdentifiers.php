<?php
/**
 * Clean Url Get Records From Identifiers
 */

/**
 * @package Omeka\Plugins\CleanUrl\views\helpers
 */
class CleanUrl_View_Helper_GetRecordsFromIdentifiers extends Zend_View_Helper_Abstract
{
    private static $_prefix;

    /**
     * Get records from identifiers.
     *
     * Currently, files records are returned only in admin view.
     *
     * @todo Return public files when public is checked.
     *
     * @param string|array $identifiers One or a list of identifiers. May
     * contains the prefix.
     * @param boolean $withPrefix Indicates if identifier contains the prefix.
     * @param string $return Format of the returned value. can be: 'record',
     * 'type and id' or 'id'.
     * @param boolean $checkPublic Return results depending on users (default)
     * or not. If return format is 'record', check is always done. For files,
     * they are returned only for admin.
     * @return Omeka_Record_AbstractRecord|array|null|integer
     * Found record, or ordered records array, or null. Duplicates are not
     * returned.
     */
    public function getRecordsFromIdentifiers(
        $identifiers,
        $withPrefix = true,
        $return = 'record',
        $checkPublic = true)
    {
        $one = false;
        if (is_string($identifiers)) {
            $one = true;
            $identifiers = array($identifiers);
        }

        // Clean and lowercase identifier to facilitate search.
        $identifiers = array_map('self::_cleanIdentifier', $identifiers);
        $identifiers = array_filter($identifiers);
        if (empty($identifiers)) {
            return null;
        }

        $db = get_db();
        $elementId = (integer) get_option('clean_url_identifier_element');

        if ($withPrefix) {
            $bind = $identifiers;
        }
        else {
            self::$_prefix = get_option('clean_url_identifier_prefix');
            // Check with a space between prefix and identifier too.
            $bind = array_map('self::_addPrefixToIdentifier', $identifiers);
            $bind = array_merge($bind, array_map('self::_addPrefixSpaceToIdentifier', $identifiers));
        }

        // TODO Use filters for user or use regular methods (get_record_by_id() checks it).
        if (($checkPublic || $return == 'record') && !(is_admin_theme() || current_user())) {
            $sqlFromIsPublic = "
                LEFT JOIN {$db->Item} items
                    ON element_texts.record_type = 'Item'
                        AND element_texts.record_id = items.id
                LEFT JOIN {$db->Collection} collections
                    ON element_texts.record_type = 'Collection'
                        AND element_texts.record_id = collections.id
                LEFT JOIN {$db->File} files
                    ON element_texts.record_type = 'File'
                        AND element_texts.record_id = files.id
                        AND files.item_id = items.id
            ";
            $sqlWhereIsPublic = "
                AND ((element_texts.record_type = 'Item' AND items.public = 1)
                    OR (element_texts.record_type = 'Collection' AND collections.public = 1)
                    OR (element_texts.record_type = 'File' AND items.public = 1)
                )
            ";
        }
        else {
            $sqlFromIsPublic = '';
            $sqlWhereIsPublic = '';
        }

        $sqlLimit = $one ? 'LIMIT 1' : '';

        $commaIdentifiers = "'" . implode("', '", $bind) . "'";
        $sql = "
            SELECT element_texts.record_type as 'type', element_texts.record_id as 'id'
            FROM {$db->ElementText} element_texts
                $sqlFromIsPublic
            WHERE element_texts.element_id = '$elementId'
                AND element_texts.text IN ($commaIdentifiers)
                $sqlWhereIsPublic
            ORDER BY
                FIELD(element_texts.text, $commaIdentifiers)
            $sqlLimit
        ";
        // TODO Secure bind.
        $results = $db->fetchAll($sql);

        if ($results) {
            switch ($return) {
                case 'record':
                    foreach ($results as $key => $result) {
                        $results[$key] = get_record_by_id($result['type'], $result['id']);
                    }
                    break;

                case 'public type and id':
                case 'type and id':
                    break;

                case 'public id':
                case 'id':
                    foreach ($results as $key => $result) {
                        $results[$key] = $result['id'];
                    }
                    break;

                default:
                    return null;
            }
            return $one
                ? array_shift($results)
                : $results;
        }
        return null;
    }

    /**
     * Return a cleaned string to simplify search of an identifier.
     */
    private static function _cleanIdentifier($string)
    {
        return trim(strtolower($string), ' /\\?<>:*%|"\'`&; ');
    }

    /**
     * Add prefix to an identifier.
     */
    private static function _addPrefixToIdentifier($string)
    {
        return self::$_prefix . $string;
    }

    /**
     * Add prefix and space to an identifier.
     */
    private static function _addPrefixSpaceToIdentifier($string)
    {
        return self::$_prefix . ' ' . $string;
    }
}
