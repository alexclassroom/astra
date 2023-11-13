<?php
/**
 * social Header Configuration.
 *
 * @author      Astra
 * @copyright   Copyright (c) 2023, Astra
 * @link        https://wpastra.com/
 * @since       x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register social header builder Customizer Configurations.
 *
 * @param array $configurations Astra Customizer Configurations.
 * @since x.x.x
 * @return array Astra Customizer Configurations with updated configurations.
 */
function astra_header_social_configuration( $configurations = array() ) {

	$_configs = Astra_Social_Icon_Component_Configs::register_configuration( $configurations, 'header', 'section-hb-social-icons-' );

	if ( Astra_Builder_Customizer::astra_collect_customizer_builder_data() ) {
		array_map( 'astra_save_header_customizer_configs', $_configs );
	}

	return $_configs;
}

if ( Astra_Builder_Customizer::astra_collect_customizer_builder_data() ) {
	astra_header_social_configuration();
}
