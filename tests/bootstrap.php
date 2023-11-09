<?php
/**
 * PHPUnit bootstrap file
 */

// Composer autoloader must be loaded before WP_PHPUNIT__DIR will be available
require_once dirname( __DIR__ ) . '/vendor/autoload.php';

// Give access to tests_add_filter() function.
require_once getenv( 'WP_PHPUNIT__DIR' ) . '/includes/functions.php';

/**
 * Registers theme.
 */
function register_astra_theme() {

	$theme_dir     = dirname( __DIR__ );
	$current_theme = basename( $theme_dir );
	$theme_root    = dirname( $theme_dir );

	add_filter( 'theme_root', function () use ( $theme_root ) {
		return $theme_root;
	} );

	register_theme_directory( $theme_root );

	add_filter( 'pre_option_template', function () use ( $current_theme ) {
		return $current_theme;
	} );

	add_filter( 'pre_option_stylesheet', function () use ( $current_theme ) {
		return $current_theme;
	} );
}

tests_add_filter( 'muplugins_loaded', 'register_astra_theme' );

// Start up the WP testing environment.
require getenv( 'WP_PHPUNIT__DIR' ) . '/includes/bootstrap.php';
