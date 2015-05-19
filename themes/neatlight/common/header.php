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
      <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    <title>
      <?php echo option('site_title');
      echo isset($title) ? ' | ' . $title : ''; ?>
    </title>

    <!-- Google analytics. -->
    <?php fire_plugin_hook('public_head', array('view'=>$this)); ?>
	
	<!-- For use with media queries AS edit --> 
	<meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSS/JS. -->
    <?php echo head_css(false); ?>
    <?php echo head_js(false); ?>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script type="text/javascript" src="/themes/neatlight/javascripts/jquery.cookie.js"></script>
  </head>

  <?php echo body_tag(array('id' => @$bodyid, 'class' => @$bodyclass)); ?>
    <div class="container">
