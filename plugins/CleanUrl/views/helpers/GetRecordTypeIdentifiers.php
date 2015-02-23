<?php
/**
 * Clean Url Get Record Type Identifiers
 */

/**
 * @package Omeka\Plugins\CleanUrl\views\helpers
 */
class CleanUrl_View_Helper_GetRecordTypeIdentifiers extends Zend_View_Helper_Abstract
{
    /**
     * Return identifiers for a record type, if any. It can be sanitized.
     *
     * @param string $recordType Should be "Collection", "Item" or "File".
     * @param boolean $sanitize Sanitize the identifier or not.
     *
     * @return array Associative array of record id and identifiers.
     */
    public function getRecordTypeIdentifiers($recordType, $sanitize = true)
    {
        if (!in_array($recordType, array('Collection', 'Item', 'File'))) {
            return array();
        }

        // Use a direct query in order to improve speed.
        $db = get_db();
        $elementId = (integer) get_option('clean_url_identifier_element');
        $bind = array();

        $prefix = get_option('clean_url_identifier_prefix');
        if ($prefix) {
            // Keep only the identifier without the configured prefix.
            $prefixLenght = strlen($prefix) + 1;
            $sqlSelect = 'SELECT element_texts.record_id, TRIM(SUBSTR(element_texts.text, ' . $prefixLenght . '))';
            $sqlWereText = 'AND element_texts.text LIKE ?';
            $bind[] = $prefix . '%';
        }
        else {
            $sqlSelect = 'SELECT element_texts.record_id, element_texts.text';
            $sqlWereText = '';
        }

        // The "order by id DESC" allows to get automatically the first row in
        // php result and avoids a useless subselect in sql (useless because in
        // almost all cases, there is only one identifier).
        $sql = "
            $sqlSelect
            FROM {$db->ElementText} element_texts
            WHERE element_texts.element_id = '$elementId'
                AND element_texts.record_type = '$recordType'
                $sqlWereText
            ORDER BY element_texts.record_id, element_texts.id DESC
        ";
        $result = $db->fetchPairs($sql, $bind);

        // Sanitize identifiers in order to use it securely in a clean url.
        if ($sanitize) {
            foreach ($result as &$identifier) {
                $identifier = $this->_sanitizeString(trim($identifier, ' /\\'));
            }
        }

        return $result;
    }

    /**
     * Returns a sanitized and unaccentued string for folder or file path.
     *
     * @param string $string The string to sanitize.
     *
     * @return string The sanitized string to use as a folder or a file name.
     */
    private function _sanitizeString($string)
    {
        $space = '';
        $string = trim(strip_tags($string));
        $string = htmlentities($string, ENT_NOQUOTES, 'utf-8');
        $string = preg_replace('#\&([A-Za-z])(?:acute|cedil|circ|grave|lig|orn|ring|slash|th|tilde|uml)\;#', '\1', $string);
        $string = preg_replace('#\&([A-Za-z]{2})(?:lig)\;#', '\1', $string);
        $string = preg_replace('#\&[^;]+\;#', '_', $string);
        $string = preg_replace('/[^[:alnum:]\(\)\[\]_\-\.#~@+:' . $space . ']/', '_', $string);
        return preg_replace('/_+/', '_', $string);
    }
}
