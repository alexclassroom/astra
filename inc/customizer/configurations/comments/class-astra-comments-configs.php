<?php
/**
 * Comments options for Astra Theme.
 *
 * @package     Astra
 * @author      Astra
 * @copyright   Copyright (c) 2023, Astra
 * @link        https://wpastra.com/
 * @since       Astra x.x.x
 */

if ( ! class_exists( 'Astra_Comments_Configs' ) ) {

	/**
	 * Register Comments Customizer Configurations.
	 */
	class Astra_Comments_Configs extends Astra_Customizer_Config_Base {

		/**
		 * Register Comments Customizer Configurations.
		 *
		 * @param Array                $configurations Astra Customizer Configurations.
		 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
		 * @since 3.8.0
		 * @return Array Astra Customizer Configurations with updated configurations.
		 */
		public function register_configuration( $configurations, $wp_customize ) {

			$_configs = array(
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[comments-single-section-heading]',
					'section'  => 'section-blog-single',
					'type'     => 'control',
					'control'  => 'ast-heading',
					'title'    => __( 'Comments', 'astra' ),
					'priority' => 20,
					'divider'  => array( 'ast_class' => 'ast-section-spacing' ),
				),
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[comments-box-placement]',
					'default'    => astra_get_option( 'comments-box-placement' ),
					'type'       => 'control',
					'section'  => 'section-blog-single',
					'priority' => 20,
					'title'      => __( 'Section Placement', 'astra' ),
					'control'    => 'ast-selector',
					'description' => __( 'Decide whether to isolate or integrate the module with the entry content area.', 'astra' ),
					'choices'    => array(
						'inside' => __( 'Contained', 'astra' ),
						'outside' => __( 'Separated', 'astra' ),
					),
					'divider'     => array( 'ast_class' => 'ast-section-spacing' ),
					'context'  => Astra_Builder_Helper::$general_tab,
					'responsive' => false,
					'renderAs'   => 'text',
				),
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[comments-box-container-width]',
					'default'    => astra_get_option( 'comments-box-container-width' ),
					'type'       => 'control',
					'section'  => 'section-blog-single',
					'priority' => 20,
					'title'      => __( 'Structure', 'astra' ),
					'control'    => 'ast-selector',
					'choices'    => array(
						'default'     => __( 'Default', 'astra' ),
						'wide' => __( 'Wide', 'astra' ),
						'full' => __( 'Full', 'astra' ),
					),
					'context'     => array(
						Astra_Builder_Helper::$general_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[comments-box-placement]',
							'operator' => '==',
							'value'    => 'outside',
						),
					),
					'responsive' => false,
					'renderAs'   => 'text',
				),
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[comment-form-position]',
					'default'    => astra_get_option( 'comment-form-position' ),
					'type'       => 'control',
					'section'  => 'section-blog-single',
					'priority' => 20,
					'title'      => __( 'Form Position', 'astra' ),
					'control'    => 'ast-selector',
					'choices'    => array(
						'below' => __( 'Below Comments', 'astra' ),
						'above' => __( 'Above Comments', 'astra' ),
					),
					'context'  => Astra_Builder_Helper::$general_tab,
					'divider'     => array( 'ast_class' => 'ast-top-dotted-divider' ),
					'responsive' => false,
					'renderAs'   => 'text',
				),
			);

			return array_merge( $configurations, $_configs );
		}
	}
}

/**
 * Kicking this off by creating new instance.
 */
new Astra_Comments_Configs();
