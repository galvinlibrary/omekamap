<?php

/* vim: set linebreak wrap nolist tabstop=2 shiftwidth=2 softtabstop=2: */

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>

<div class="header">

  <h1 class="name">
    <?php echo metadata('item', array(
        'Dublin Core', 'Title'
    )); ?>
  </h1>

  <div class="state">
    <?php echo metadata('item', array(
        'Item Type Metadata', 'State'
    )); ?>
  </div>

</div>

<div class="content">

  <hr />

  <div class="picture">
    <?php echo file_markup($item->Files, array(
      'imageSize' => 'fullsize',
      'linkToFile' => false
    )); ?>
  </div>

  <div class="text source">

    <?php $source = metadata('item', array(
        'Dublin Core', 'Source'
    )); ?>

    <span>From</span>

    <a
      href="<?php echo $source; ?>"
      target="_blank"
    >Signers of the Declaration</a>:

  </div>

  <div class="text summary">
    <?php echo metadata('item', array(
        'Item Type Metadata', 'Biographical Summary'
    )); ?>
  </div>

  <hr />

  <div class="text biography">
    <?php echo metadata('item', array(
        'Item Type Metadata', 'Biographical Text'
    )); ?>
  </div>

</div>
