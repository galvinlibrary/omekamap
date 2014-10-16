<!DOCTYPE html>
<html lang="<?php echo get_html_lang(); ?>" class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?php echo option('site_title'); echo isset($title) ? ' | ' . strip_formatting($title) : ''; ?></title>
    <meta name="viewport" content="width=device-width">

    <?php echo auto_discovery_link_tags(); ?>

   <?php fire_plugin_hook('public_head', array('view'=>$this)); ?>

    <!-- Style Sheets -->
    <?php echo head_css(); ?>

    <!-- JavaScripts -->
    <?php echo head_js(); ?>
</head>

<?php echo body_tag(array('id' => @$bodyid, 'class' => @$bodyclass)); ?>
    <?php fire_plugin_hook('public_body', array('view'=>$this)); ?>
    <header role="banner">

        <?php fire_plugin_hook('public_header', array('view'=>$this)); ?>

        <?php echo theme_header_image(); ?>

        <h1 id="site-title"><?php echo link_to_home_page(theme_logo()); ?></h1>

        <div id="search-container">
            <?php echo search_form(array('form_attributes' => array('role' => 'search'))); ?>
        </div>

        <nav id="top-nav">
            <?php echo public_nav_main(); ?>
        </nav>

    </header>

    <div role="main">

        <?php fire_plugin_hook('public_content_top', array('view'=>$this)); ?>

