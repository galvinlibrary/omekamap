<?php
/**
 * Clean Url Get Record Identifier
 */

/**
 * @package Omeka\Plugins\CleanUrl\views\helpers
 */
class CleanUrl_View_Helper_GetRecordIdentifier extends Zend_View_Helper_Abstract
{
    /**
     * Return the identifier of a record, if any. It can be sanitized.
     *
     * @param Omeka_Record_AbstractRecord|string $record
     * @param boolean $sanitize Sanitize the identifier or not.
     *
     * @return string
     *   Identifier of the record, if any, else empty string.
     */
    public function getRecordIdentifier($record, $sanitize = true)
    {
        // Get the current record from the view if passed as a string.
        if (is_string($record)) {
            $record = $this->view->getCurrentRecord($record);
        }
        if (empty($record)) {
            return '';
        }
        if (!($record instanceof Omeka_Record_AbstractRecord)) {
            throw new Omeka_View_Exception(__('Invalid record passed while getting record URL.'));
        }

        // Use a direct query in order to improve speed.
        $db = get_db();
        $elementId = (integer) get_option('clean_url_identifier_element');
        $bind = array(
            get_class($record),
            $record->id,
        );

        $prefix = get_option('clean_url_identifier_prefix');
        if ($prefix) {
            // Keep only the identifier without the configured prefix.
            $prefixLenght = strlen($prefix) + 1;
            $sqlSelect = 'SELECT TRIM(SUBSTR(element_texts.text, ' . $prefixLenght . '))';
            $sqlWhereText = 'AND element_texts.text LIKE ?';
            $bind[] = $prefix . '%';
        }
        else {
            $sqlSelect = 'SELECT element_texts.text';
            $sqlWhereText = '';
        }

        $sql = "
            $sqlSelect
            FROM {$db->ElementText} element_texts
            WHERE element_texts.element_id = '$elementId'
                AND element_texts.record_type = ?
                AND element_texts.record_id = ?
                $sqlWhereText
            ORDER BY element_texts.id
            LIMIT 1
        ";
        $identifier = $db->fetchOne($sql, $bind);

        if (empty($identifier)) {
            return '';
        }

        // Sanitize the identifier in order to use it securely in a clean url.
        if ($sanitize) {
            $identifier = $this->_sanitizeString(trim($identifier, ' /\\'));
        }

        return $identifier;
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
