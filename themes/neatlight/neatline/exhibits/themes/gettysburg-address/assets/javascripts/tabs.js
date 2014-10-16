
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

$(function() {


  var narrative   = $('div.narrative');
  var navigation  = $('ul.nav');
  var sections    = $('h1.section');

  var navOffset   = navigation.offset().top;
  var navHeight   = navigation.outerHeight();

  var placeholder = null;
  var isAffixed   = false;


  // Listen for scroll.
  narrative.scroll(function() {

    var scroll = $(this).scrollTop();

    // (1) (Un-)affix the menu:
    // ------------------------------------------------------------------------

    // When scrolled below the menu.
    if (!isAffixed && scroll >= navOffset) {

      // Add placeholder to preserve height
      placeholder = navigation.clone().insertAfter(navigation);
      placeholder.css('visibility', 'hidden');

      // Affix the menu.
      navigation.addClass('affix');

      isAffixed = true;

    }

    // When scrolled above the menu.
    else if (isAffixed && scroll < navOffset) {

      // De-affix the menu.
      navigation.removeClass('affix');
      placeholder.remove();

      isAffixed = false;

    }

    // (2) Set the active tab:
    // ------------------------------------------------------------------------

    // Get the currently-active section.
    var section = $(_.last(sections.map(function() {
      if ($(this).offset().top+scroll < scroll+navHeight+11) return this;
    })));

    // Get the active tab `href`.
    var href = '#'+section.attr('id');

    // Clear active tab.
    navigation.find('li').removeClass('active')

    // Apply the new active tab.
    navigation.find('li').has('a[href="'+href+'"]').addClass('active');

  });


  // Listen for tab clicks.
  navigation.find('a').click(function(e) {

    e.preventDefault();

    // Smooth animate to the section (10px padding above the headings).
    var offset = $($(this).attr('href')).offset().top + narrative.scrollTop();
    narrative.stop().animate({ scrollTop: offset-navHeight-10 });

  });


  narrative.scroll(); // Trigget `scroll` on startup to activate first tab.


});
