<?php

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


/**
 * Convert KML -> WKT.
 *
 * @param string $wkt The coverage.
 * @return string|null The WKT.
 */
function nl_kml2wkt($kml) {

    $wkt = null;

    // Is the input valid KML?
    if (geoPHP::detectFormat($kml) == 'kml') {
        $geo = geoPHP::load($kml);
        $wkt = geoPHP::geometryReduce($geo)->out('wkt');
    }

    return $wkt;

}


/**
 * Given a raw coverage value, try to extract a valid WKT string. If the value
 * is already WKT, return it unchanged. If it's KML, convert it to WKT.
 *
 * @param string $coverage A coverage.
 * @return string|null WKT.
 */
function nl_getWkt($coverage) {

    $wkt = null;

    // Return existing WKT.
    if (Validator::isValidWkt($coverage)) {
        return $coverage;
    }

    // Otherwise, KML -> WKT.
    else $wkt = nl_kml2wkt($coverage);

    return $wkt;

}


/**
 * Return record coverage data from the NeatlineFeatures plugin.
 *
 * @param $record NeatlineRecord The record to get the feature for.
 * @return string|null
 */
function nl_getNeatlineFeaturesWkt($record) {

    // Halt if Features is not present.
    if (!plugin_is_active('NeatlineFeatures')) return;

    $db = get_db();

    // Get raw coverage.
    $result = $db->fetchOne(
        "SELECT geo FROM `{$db->prefix}neatline_features`
        WHERE is_map=1 AND item_id=?;",
        $record->item_id
    );

    if ($result) {

        // If KML, convert to WKT.
        if (geoPHP::detectFormat($result) == 'kml') {
            $result = nl_kml2wkt(trim($result));
        }

        // If WKT, implode and wrap as `GEOMETRYCOLLECTION`.
        else {
            $result = 'GEOMETRYCOLLECTION(' .
                implode(',', explode('|', $result)) .
            ')';
        }
    }

    return $result;

}
