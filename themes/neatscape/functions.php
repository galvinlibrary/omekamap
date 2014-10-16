<?php

/**
 * Adds theme assets to queues.
 *
 * - Modernizr
 * - Respond.js
 * - Selectivizr
 * - Google Fonts style sheet
 * - Theme style sheet
 */
function queue_theme_assets() {
    queue_js_file('modernizr.min');
    queue_js_file(array('respond.min', 'selectivizr.min'), 'javascripts', array('conditional' => 'lt IE 9'));

    get_view()->headLink()->prependStylesheet('http://fonts.googleapis.com/css?family=Crimson+Text:400,600,400italic,600italic|Cabin:400,600,400italic', 'screen');
    queue_css_file('style');
}

function hijack_exhibit_builder_random_featured_exhibit()
{
    $html = '<div id="featured-exhibit">';
    $featuredExhibit = exhibit_builder_random_featured_exhibit();
    $html .= '<h2>' . __('Featured Exhibit') . '</h2>';
    if ($featuredExhibit) {
        $html .= '<h3>' . exhibit_builder_link_to_exhibit($featuredExhibit) . '</h3>'."\n";
       if ($item = get_record('Item', array('sort_field' => 'random', 'exhibit' => $featuredExhibit->id, 'hasImage' => true))) {
            $html .= exhibit_builder_link_to_exhibit($featuredExhibit,
                item_image('square_thumbnail', array(), 0, $item),
                array('class' => 'image')
            );
       }

       $html .= '<p class="description">'.snippet_by_word_count(metadata($featuredExhibit, 'description', array('no_escape' => true))).'</p>';
    } else {
       $html .= '<p>' . __('You have no featured exhibits.') . '</p>';
    }
    $html .= '</div>';
    return $html;
}
