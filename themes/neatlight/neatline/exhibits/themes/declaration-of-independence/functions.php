<?php

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


/**
 * Render the map icon partial.
 */
function doi_map_icon($slug)
{
    return get_view()->partial(
        'neatline/exhibits/themes/declaration-of-independence/' .
        'partials/map_icon.php',
        array('slug' => $slug)
    );
}


/**
 * Render the painting icon partial.
 */
function doi_painting_icon($slug)
{
    return get_view()->partial(
        'neatline/exhibits/themes/declaration-of-independence/' .
        'partials/painting_icon.php',
        array('slug' => $slug)
    );
}
