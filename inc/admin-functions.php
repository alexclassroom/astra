<?php
/**
 * Admin functions - Functions that add some functionality to WordPress admin panel
 *
 * @package Astra
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Register menus
 */
if ( ! function_exists( 'astra_register_menu_locations' ) ) {

	/**
	 * Register menus
	 *
	 * @since 1.0.0
	 */
	function astra_register_menu_locations() {

		/**
		 * Primary Menus
		 */
		register_nav_menus(
			array(
				'primary' => __( 'Primary Menu', 'astra' ),
			)
		);

		if ( true === Astra_Builder_Helper::$is_header_footer_builder_active ) {

			/**
			 * Register the Secondary & Mobile menus.
			 */
			register_nav_menus(
				array(
					'secondary_menu' => __( 'Secondary Menu', 'astra' ),
					'mobile_menu'    => __( 'Off-Canvas Menu', 'astra' ),
				)
			);


			$component_limit = defined( 'ASTRA_EXT_VER' ) ? Astra_Builder_Helper::$component_limit : Astra_Builder_Helper::$num_of_header_menu;

			for ( $index = 3; $index <= $component_limit; $index++ ) {

				if ( ! is_customize_preview() && ! Astra_Builder_Helper::is_component_loaded( 'menu-' . $index ) ) {
					continue;
				}

				register_nav_menus(
					array(
						'menu_' . $index => __( 'Menu ', 'astra' ) . $index,
					)
				);
			}

			/**
			 * Register the Account menus.
			 */
			register_nav_menus(
				array(
					'loggedin_account_menu' => __( 'Logged In Account Menu', 'astra' ),
				)
			);

		}

		/**
		 * Footer Menus
		 */
		register_nav_menus(
			array(
				'footer_menu' => __( 'Footer Menu', 'astra' ),
			)
		);

	}
}

add_action( 'init', 'astra_register_menu_locations' );

add_action( 'admin_head', 'archive_meta_disable' );

/**
 * Page meta option is hide from archive pages. 
 *
 * @SInCE x.x.x
 * @return void
 */
function archive_meta_disable() {
	$page_for_posts_ID = get_option( 'page_for_posts' );
	if ( get_the_ID() == $page_for_posts_ID ) {
		echo '<style type="text/css">
     #astra_settings_meta_box .components-panel__body:nth-child(1), #astra_settings_meta_box .components-panel__body:nth-child(2){
	display:none !important;
	} 
  </style>';
	}
}
