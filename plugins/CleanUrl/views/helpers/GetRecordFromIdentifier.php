<?php
/**
 * Clean Url Get Record From Identifier
 *
 * @copyright Copyright 2007-2012 Roy Rosenzweig Center for History and New Media
 * @license http://www.gnu.org/licenses/gpl-3.0.txt GNU GPLv3
 */

/**
 * @package Omeka\Plugins\CleanUrl\views\helpers
 */
class CleanUrl_View_Helper_GetRecordFromIdentifier extends Zend_View_Helper_Abstract
{
    /**
     * Get record from identifier
     *
     * @param string $identifier The identifier of the record to find.
     * @param boolean $withPrefix Optional. If identifier begins with prefix.
     * @param string $recordType Optional. Search a specific record type if any.
     * @param boolean $onlyRecordId Optional. Return only the record id.
     * @return Omeka_Record_AbstractRecord|null
     */
    public function getRecordFromIdentifier(
        $identifier,
        $withPrefix = false,
        $recordType = null,
        $onlyRecordId = false
    ) {
        $db = get_db();
        $elementId = (integer) get_option('clean_url_identifier_element');

        // Clean and lowercase identifier to facilitate search.
        $identifier = trim(strtolower($identifier), ' /\\?<>:*%|"\'`&; ');

        $bind = array();

        if ($recordType) {
            $sqlRecordType = "AND element_texts.record_type = ?";
            $bind[] = $recordType;
            $sqlOrder = 'ORDER BY element_texts.record_id, element_texts.id';
        }
        else {
            $sqlRecordType = '';
            $sqlOrder = "ORDER BY FIELD(element_texts.record_type, 'Collection', 'Item', 'File'), element_texts.record_id, element_texts.id";
        }

        if ($withPrefix) {
            $sqlText = 'AND element_texts.text = ?';
            $bind[] = $identifier;
        }
        else {
            $sqlText = 'AND (element_texts.text = ? OR element_texts.text = ?)';
            $prefix = get_option('clean_url_identifier_prefix');
            $bind[] = $prefix . $identifier;
            // Check with a space between prefix and identifier too.
            $bind[] = $prefix . ' ' . $identifier;
        }

        $sql = "
            SELECT element_texts.record_type, element_texts.record_id
            FROM {$db->ElementText} element_texts
            WHERE element_texts.element_id = '$elementId'
                $sqlRecordType
                $sqlText
            $sqlOrder
            LIMIT 1
        ";
        $result = $db->fetchRow($sql, $bind);

        if ($result) {
            return $onlyRecordId
                ? $result['record_id']
                : get_record_by_id($result['record_type'], $result['record_id']);
        }
    }
}
