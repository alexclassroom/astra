<?php
/**
 * Posts Structures Options for special pages.
 *
 * 1. Search page.
 *
 * @package     Astra
 * @author      Brainstorm Force
 * @copyright   Copyright (c) 2023, Brainstorm Force
 * @link        https://www.brainstormforce.com
 * @since       Astra x.x.x
 */

// Block direct access to the file.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Bail if Customizer config base class does not exist.
if ( ! class_exists( 'Astra_Customizer_Config_Base' ) ) {
	return;
}

/**
 * Register Posts Structures Customizer Configurations.
 *
 * @since x.x.x
 */
class Astra_Posts_Special_Archive_Structures_Configs extends Astra_Customizer_Config_Base {

	/**
	 * Register Posts Structures Customizer Configurations.
	 *
	 * @param array                $configurations Astra Customizer Configurations.
	 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
	 * @since x.x.x
	 * @return Array Astra Customizer Configurations with updated configurations.
	 */
	public function register_configuration( $configurations, $wp_customize ) {
		$section   = 'ast-section-search-page';

		$blog_layout = array(
			'blog-layout-4' => array(
				'label' => __( 'Grid', 'astra' ),
				'path'  => ( class_exists( 'Astra_Builder_UI_Controller' ) ) ? Astra_Builder_UI_Controller::fetch_svg_icon( 'blog-layout-4', false ) : '',
			),
			'blog-layout-5' => array(
				'label' => __( 'List', 'astra' ),
				'path'  => ( class_exists( 'Astra_Builder_UI_Controller' ) ) ? Astra_Builder_UI_Controller::fetch_svg_icon( 'blog-layout-5', false ) : '',
			),
			'blog-layout-6' => array(
				'label' => __( 'Cover', 'astra' ),
				'path'  => ( class_exists( 'Astra_Builder_UI_Controller' ) ) ? Astra_Builder_UI_Controller::fetch_svg_icon( 'blog-layout-6', false ) : '',
			),
		);

		/** @psalm-suppress UndefinedClass */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$if_astra_addon = defined( 'ASTRA_EXT_VER' ) && Astra_Ext_Extension::is_active( 'blog-pro' );
		/** @psalm-suppress UndefinedClass */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

		foreach ( Astra_Posts_Structure_Loader::get_special_page_types() as $index => $special_type ) {
			$section   = 'ast-section-' . $special_type . '-page';
			$title_section = 'section-' . $special_type . '-page-title';

			$_configs = array(

				array(
					'name'        => $section . '-ast-context-tabs',
					'section'     => $section,
					'type'        => 'control',
					'control'     => 'ast-builder-header-control',
					'priority'    => 0,
					'description' => '',
					'context'     => array(),
				),

				array(
					'name'     => $title_section,
					'title'    => __( ucfirst( $special_type ) . ' Title', 'astra' ),
					'type'     => 'section',
					'section'  => $section,
					'priority' => 1,
				),

				array(
					'name'     => ASTRA_THEME_SETTINGS . '[ast-' . $special_type . '-page-title]',
					'type'     => 'control',
					'default'  => astra_get_option( 'ast-' . $special_type . '-page-title', true ),
					'control'  => 'ast-section-toggle',
					'section'  => $section,
					'priority' => 2,
					'linked'   => $title_section,
					'linkText' => __( ucfirst( $special_type ) . ' Page Title', 'astra' ),
					'divider'  => array( 'ast_class' => 'ast-bottom-divider ast-bottom-section-divider' ),
				),

				/**
				 * Option: Revamped Single Container Layout.
				 */
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[ast-' . $special_type . '-content-layout]',
					'type'              => 'control',
					'control'           => 'ast-radio-image',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_choices' ),
					'section'           => $section,
					'default'           => astra_get_option( 'ast-' . $special_type . '-content-layout', 'default' ),
					'priority'          => 3,
					'title'             => __( 'Container Layout', 'astra' ),
					'choices'           => array(
						'default'                => array(
							'label' => __( 'Default', 'astra' ),
							'path'  => ( class_exists( 'Astra_Builder_UI_Controller' ) ) ? Astra_Builder_UI_Controller::fetch_svg_icon( 'layout-default', false ) : '',
						),
						'normal-width-container' => array(
							'label' => __( 'Normal', 'astra' ),
							'path'  => ( class_exists( 'Astra_Builder_UI_Controller' ) ) ? Astra_Builder_UI_Controller::fetch_svg_icon( 'normal-width-container', false ) : '',
						),
						'narrow-width-container' => array(
							'label' => __( 'Narrow', 'astra' ),
							'path'  => ( class_exists( 'Astra_Builder_UI_Controller' ) ) ? Astra_Builder_UI_Controller::fetch_svg_icon( 'narrow-width-container', false ) : '',
						),
						'full-width-container'   => array(
							'label' => __( 'Full Width', 'astra' ),
							'path'  => ( class_exists( 'Astra_Builder_UI_Controller' ) ) ? Astra_Builder_UI_Controller::fetch_svg_icon( 'full-width-container', false ) : '',
						),
					),
					'divider'           => array( 'ast_class' => 'ast-top-divider ast-bottom-spacing' ),
				),

				/**
				 * Option: Single Content Style.
				 */
				array(
					'name'        => ASTRA_THEME_SETTINGS . '[ast-' . $special_type . '-content-style]',
					'type'        => 'control',
					'control'     => 'ast-selector',
					'section'     => $section,
					'default'     => astra_get_option( 'ast-' . $special_type . '-content-style', 'default' ),
					'priority'    => 3,
					'title'       => __( 'Container Style', 'astra' ),
					'description' => __( 'Container style will apply only when layout is set to either normal or narrow.', 'astra' ),
					'choices'     => array(
						'default' => __( 'Default', 'astra' ),
						'unboxed' => __( 'Unboxed', 'astra' ),
						'boxed'   => __( 'Boxed', 'astra' ),
					),
					'renderAs'    => 'text',
					'responsive'  => false,
					'divider'     => array( 'ast_class' => 'ast-top-dotted-divider' ),
				),

				/**
				 * Option: Single Sidebar Layout.
				 */
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[ast-' . $special_type . '-sidebar-layout]',
					'type'              => 'control',
					'control'           => 'ast-radio-image',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_choices' ),
					'section'           => $section,
					'default'           => astra_get_option( 'ast-' . $special_type . '-sidebar-layout', 'default' ),
					'description'       => __( 'Sidebar will only apply when container layout is set to normal.', 'astra' ),
					'priority'          => 3,
					'title'             => __( 'Sidebar Layout', 'astra' ),
					'divider'           => array( 'ast_class' => 'ast-top-section-divider' ),
					'choices'           => array(
						'default'       => array(
							'label' => __( 'Default', 'astra' ),
							'path'  => ( class_exists( 'Astra_Builder_UI_Controller' ) ) ? Astra_Builder_UI_Controller::fetch_svg_icon( 'layout-default', false ) : '',
						),
						'no-sidebar'    => array(
							'label' => __( 'No Sidebar', 'astra' ),
							'path'  => ( class_exists( 'Astra_Builder_UI_Controller' ) ) ? Astra_Builder_UI_Controller::fetch_svg_icon( 'no-sidebar', false ) : '',
						),
						'left-sidebar'  => array(
							'label' => __( 'Left Sidebar', 'astra' ),
							'path'  => ( class_exists( 'Astra_Builder_UI_Controller' ) ) ? Astra_Builder_UI_Controller::fetch_svg_icon( 'left-sidebar', false ) : '',
						),
						'right-sidebar' => array(
							'label' => __( 'Right Sidebar', 'astra' ),
							'path'  => ( class_exists( 'Astra_Builder_UI_Controller' ) ) ? Astra_Builder_UI_Controller::fetch_svg_icon( 'right-sidebar', false ) : '',
						),
					),
				),

				/**
				 * Option: Single Sidebar Style.
				 */
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[ast-' . $special_type . '-sidebar-style]',
					'type'       => 'control',
					'control'    => 'ast-selector',
					'section'    => $section,
					'default'    => astra_get_option( 'ast-' . $special_type . '-sidebar-style', 'default' ),
					'priority'   => 3,
					'title'      => __( 'Sidebar Style', 'astra' ),
					'choices'    => array(
						'default' => __( 'Default', 'astra' ),
						'unboxed' => __( 'Unboxed', 'astra' ),
						'boxed'   => __( 'Boxed', 'astra' ),
					),
					'responsive' => false,
					'renderAs'   => 'text',
					'divider'    => array( 'ast_class' => 'ast-top-divider' ),
				),

				array(
					'name'              => ASTRA_THEME_SETTINGS . '[ast-' . $special_type . '-results-style]',
					'type'              => 'control',
					'control'           => 'ast-radio-image',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_choices' ),
					'section'           => $section,
					'default'           => astra_get_option( 'ast-' . $special_type . '-results-style' ),
					'priority'          => 14,
					'divider'    => array( 'ast_class' => 'ast-top-section-divider' ),
					'title'             => __( 'Results Layout', 'astra' ),
					'choices'           => $blog_layout,
				),

				array(
					'name'         => ASTRA_THEME_SETTINGS . '[ast-' . $special_type . '-results-per-page]',
					'default'      => astra_get_option( 'ast-' . $special_type . '-results-per-page' ),
					'type'         => 'control',
					'control'      => 'ast-number',
					'qty_selector' => true,
					'section'      => $section,
					'title'        => __( 'Post Per Page', 'astra' ),
					'priority'     => 14,
					'responsive'   => false,
					'input_attrs'  => array(
						'min'  => 1,
						'step' => 1,
						'max'  => 500,
					),
					'divider'      => array( 'ast_class' => ( $if_astra_addon ) ? 'ast-top-dotted-divider' : 'ast-top-section-divider' ),
				),

				array(
					'name'       => ASTRA_THEME_SETTINGS . '[ast-' . $special_type . '-layout-width]',
					'default'    => astra_get_option( 'ast-' . $special_type . '-layout-width', 'default' ),
					'type'       => 'control',
					'control'    => 'ast-selector',
					'section'    => $section,
					'priority'   => 50,
					'transport'  => 'postMessage',
					'title'      => __( 'Content Width', 'astra' ),
					'choices'    => array(
						'default' => __( 'Default', 'astra' ),
						'custom'  => __( 'Custom', 'astra' ),
					),
					'responsive' => false,
					'renderAs'   => 'text',
					'divider'    => array( 'ast_class' => 'ast-top-section-divider' ),
				),
			);

			$configurations = array_merge( $configurations, $_configs );
		}

		return $configurations;
	}
}

/**
 * Kicking this off by creating new object.
 */
new Astra_Posts_Special_Archive_Structures_Configs();
