<?php

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>

<!DOCTYPE html>
<html lang="<?php echo get_html_lang(); ?>">

  <head>

    <meta charset="utf-8">

    <title>
      <?php echo option('site_title');
      echo isset($title) ? ' | ' . $title : ''; ?>
    </title>

    <!-- Google analytics. -->
    <?php fire_plugin_hook('public_head', array('view'=>$this)); ?>

    <!-- CSS/JS. -->
    <?php echo head_css(false); ?>
    <?php echo head_js(false); ?>

  </head>

  <?php echo body_tag(array('id' => @$bodyid, 'class' => @$bodyclass)); ?>
    <div class="container">
