
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Toggle', function(Toggle) {


  Toggle.signers = [

    {
      name: 'Button Gwinnett',
      records: {
        text: 'button-gwinnett-signature',
        painting: false,
        map: 'st-catherines-island'
      }
    },

    {
      name: 'Lyman Hall',
      records: {
        text: 'lyman-hall-signature',
        painting: false,
        map: 'sunbury'
      }
    },

    {
      name: 'George Walton',
      records: {
        text: 'george-walton-signature',
        painting: 'george-walton-face',
        map: 'savannah'
      }
    },

    {
      name: 'William Hooper',
      records: {
        text: 'william-hooper-signature',
        painting: 'william-hooper-face',
        map: 'wilmington'
      }
    },

    {
      name: 'Joseph Hewes',
      records: {
        text: 'joseph-hewes-signature',
        painting: 'joseph-hewes-face',
        map: 'edenton'
      }
    },

    {
      name: 'John Penn',
      records: {
        text: 'john-penn-signature',
        painting: false,
        map: 'stovall'
      }
    },

    {
      name: 'Edward Rutledge',
      records: {
        text: 'edward-rutledge-signature',
        painting: 'edward-rutledge-face',
        map: 'charleston'
      }
    },

    {
      name: 'Thomas Heyward',
      records: {
        text: 'thomas-heyward-signature',
        painting: 'thomas-heyward-face',
        map: 'white-hall-plantation'
      }
    },

    {
      name: 'Thomas Lynch',
      records: {
        text: 'thomas-lynch-signature',
        painting: 'thomas-lynch-face',
        map: 'peach-tree-plantation'
      }
    },

    {
      name: 'Arthur Middleton',
      records: {
        text: 'arthur-middleton-signature',
        painting: 'arthur-middleton-face',
        map: 'middleton-place'
      }
    },

    {
      name: 'John Hancock',
      records: {
        text: 'john-hancock-signature',
        painting: 'john-hancock-face',
        map: 'boston'
      }
    },

    {
      name: 'Samuel Chase',
      records: {
        text: 'samuel-chase-signature',
        painting: 'samuel-chase-face',
        map: 'annapolis'
      }
    },

    {
      name: 'William Paca',
      records: {
        text: 'william-paca-signature',
        painting: 'william-paca-face',
        map: 'wye-plantation'
      }
    },

    {
      name: 'Thomas Stone',
      records: {
        text: 'thomas-stone-signature',
        painting: false,
        map: 'habre-de-venture'
      }
    },

    {
      name: 'Charles Carroll of Carrollton',
      records: {
        text: 'charles-carroll-signature',
        painting: 'charles-carroll-face',
        map: 'carrollton-manor'
      }
    },

    {
      name: 'George Wythe',
      records: {
        text: 'george-wythe-signature',
        painting: 'george-wythe-face',
        map: 'williamsburg'
      }
    },

    {
      name: 'Richard Henry Lee',
      records: {
        text: 'richard-henry-lee-signature',
        painting: 'richard-henry-lee-face',
        map: 'chantilly'
      }
    },

    {
      name: 'Thomas Jefferson',
      records: {
        text: 'thomas-jefferson-signature',
        painting: 'thomas-jefferson-face',
        map: 'monticello'
      }
    },

    {
      name: 'Benjamin Harrison',
      records: {
        text: 'benjamin-harrison-signature',
        painting: 'benjamin-harrison-face',
        map: 'berkeley-plantation'
      }
    },

    {
      name: 'Thomas Nelson',
      records: {
        text: 'thomas-nelson-signature',
        painting: false,
        map: 'yorktown'
      }
    },

    {
      name: 'Francis Lightfoot Lee',
      records: {
        text: 'francis-lightfoot-lee-signature',
        painting: false,
        map: 'menokin'
      }
    },

    {
      name: 'Carter Braxton',
      records: {
        text: 'carter-braxton-signature',
        painting: false,
        map: 'elsing-green'
      }
    },

    {
      name: 'Robert Morris',
      records: {
        text: 'robert-morris-signature',
        painting: 'robert-morris-face',
        map: 'philadelphia'
      }
    },

    {
      name: 'Benjamin Rush',
      records: {
        text: 'benjamin-rush-signature',
        painting: 'benjamin-rush-face',
        map: 'philadelphia'
      }
    },

    {
      name: 'Benjamin Franklin',
      records: {
        text: 'benjamin-franklin-signature',
        painting: 'benjamin-franklin-face',
        map: 'philadelphia'
      }
    },

    {
      name: 'John Morton',
      records: {
        text: 'john-morton-signature',
        painting: false,
        map: 'philadelphia'
      }
    },

    {
      name: 'George Clymer',
      records: {
        text: 'george-clymer-signature',
        painting: 'george-clymer-face',
        map: 'philadelphia'
      }
    },

    {
      name: 'James Smith',
      records: {
        text: 'james-smith-signature',
        painting: false,
        map: 'york'
      }
    },

    {
      name: 'George Taylor',
      records: {
        text: 'george-taylor-signature',
        painting: false,
        map: 'easton'
      }
    },

    {
      name: 'James Wilson',
      records: {
        text: 'james-wilson-signature',
        painting: 'james-wilson-face',
        map: 'carlisle'
      }
    },

    {
      name: 'George Ross',
      records: {
        text: 'george-ross-signature',
        painting: false,
        map: 'lancaster'
      }
    },

    {
      name: 'Caesar Rodney',
      records: {
        text: 'caesar-rodney-signature',
        painting: false,
        map: 'dover'
      }
    },

    {
      name: 'George Read',
      records: {
        text: 'george-read-signature',
        painting: 'george-read-face',
        map: 'new-castle'
      }
    },

    {
      name: 'Thomas McKean',
      records: {
        text: 'thomas-mckean-signature',
        painting: 'thomas-mckean-face',
        map: 'new-castle'
      }
    },

    {
      name: 'William Floyd',
      records: {
        text: 'william-floyd-signature',
        painting: 'william-floyd-face',
        map: 'brookhaven'
      }
    },

    {
      name: 'Philip Livingston',
      records: {
        text: 'philip-livingston-signature',
        painting: 'philip-livingston-face',
        map: 'new-york'
      }
    },

    {
      name: 'Francis Lewis',
      records: {
        text: 'francis-lewis-signature',
        painting: 'francis-lewis-face',
        map: 'new-york'
      }
    },

    {
      name: 'Lewis Morris',
      records: {
        text: 'lewis-morris-signature',
        painting: 'lewis-morris-face',
        map: 'new-york'
      }
    },

    {
      name: 'Richard Stockton',
      records: {
        text: 'richard-stockton-signature',
        painting: 'richard-stockton-face',
        map: 'princeton'
      }
    },

    {
      name: 'John Witherspoon',
      records: {
        text: 'john-witherspoon-signature',
        painting: 'john-witherspoon-face',
        map: 'princeton'
      }
    },

    {
      name: 'Francis Hopkinson',
      records: {
        text: 'francis-hopkinson-signature',
        painting: 'francis-hopkinson-face',
        map: 'bordentown'
      }
    },

    {
      name: 'John Hart',
      records: {
        text: 'john-hart-signature',
        painting: false,
        map: 'hopewell'
      }
    },

    {
      name: 'Abraham Clark',
      records: {
        text: 'abraham-clark-signature',
        painting: 'abraham-clark-face',
        map: 'roselle'
      }
    },

    {
      name: 'Josiah Bartlett',
      records: {
        text: 'josiah-bartlett-signature',
        painting: 'josiah-bartlett-face',
        map: 'kingston'
      }
    },

    {
      name: 'William Whipple',
      records: {
        text: 'william-whipple-signature',
        painting: 'william-whipple-face',
        map: 'portsmouth'
      }
    },

    {
      name: 'Samuel Adams',
      records: {
        text: 'samuel-adams-signature',
        painting: 'samuel-adams-face',
        map: 'boston'
      }
    },

    {
      name: 'John Adams',
      records: {
        text: 'john-adams-signature',
        painting: 'john-adams-face',
        map: 'boston'
      }
    },

    {
      name: 'Robert Treat Paine',
      records: {
        text: 'robert-treat-paine-signature',
        painting: 'robert-treat-paine-face',
        map: 'taunton'
      }
    },

    {
      name: 'Elbridge Gerry',
      records: {
        text: 'elbridge-gerry-signature',
        painting: 'elbridge-gerry-face',
        map: 'marblehead'
      }
    },

    {
      name: 'Stephen Hopkins',
      records: {
        text: 'stephen-hopkins-signature',
        painting: 'stephen-hopkins-face',
        map: 'providence'
      }
    },

    {
      name: 'William Ellery',
      records: {
        text: 'william-ellery-signature',
        painting: 'william-ellery-face',
        map: 'newport'
      }
    },

    {
      name: 'Roger Sherman',
      records: {
        text: 'roger-sherman-signature',
        painting: 'roger-sherman-face',
        map: 'new-haven'
      }
    },

    {
      name: 'Samuel Huntington',
      records: {
        text: 'samuel-huntington-signature',
        painting: 'samuel-huntington-face',
        map: 'norwich'
      }
    },

    {
      name: 'William Williams',
      records: {
        text: 'william-williams-signature',
        painting: 'william-williams-face',
        map: 'lebanon'
      }
    },

    {
      name: 'Oliver Wolcott',
      records: {
        text: 'oliver-wolcott-signature',
        painting: 'oliver-wolcott-face',
        map: 'litchfield'
      }
    },

    {
      name: 'Matthew Thornton',
      records: {
        text: 'matthew-thornton-signature',
        painting: false,
        map: 'londonderry'
      }
    },

    {
      name: 'George Clinton',
      records: {
        text: false,
        painting: 'george-clinton-face',
        map: false
      }
    },

    {
      name: 'Thomas Willing',
      records: {
        text: false,
        painting: 'thomas-willing-face',
        map: false
      }
    },

    {
      name: 'Robert Livingston',
      records: {
        text: false,
        painting: 'robert-livingston-face',
        map: false
      }
    },

    {
      name: 'Charles Thomson',
      records: {
        text: false,
        painting: 'charles-thomson-face',
        map: false
      }
    },

    {
      name: 'John Dickinson',
      records: {
        text: false,
        painting: 'john-dickinson-face',
        map: false
      }
    }

  ];


});
