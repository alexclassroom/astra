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

			$archive_structure_choices = array();
			$archive_structure_choices[ $title_section . '-title' ] = array(
				'clone'       => false,
				'is_parent'   => true,
				'main_index'  => $title_section . '-title',
				'clone_limit' => 2,
				'title'       => __( 'Heading', 'astra' ),
			);
			$archive_structure_choices[ $title_section . '-description' ] = array(
				'clone'       => false,
				'is_parent'   => true,
				'main_index'  => $title_section . '-description',
				'clone_limit' => 2,
				'title'       => __( 'Subheading', 'astra' ),
			);
			$archive_structure_choices[$title_section . '-breadcrumb'] = __( 'Breadcrumb', 'astra' );

			$_configs = array(

				array(
					'name'        => $title_section . '-ast-context-tabs',
					'section'     => $title_section,
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
					'panel'    => '',
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

				array(
					'name'                   => ASTRA_THEME_SETTINGS . '[' . $title_section . '-layout]',
					'type'                   => 'control',
					'control'                => 'ast-radio-image',
					'sanitize_callback'      => array( 'Astra_Customizer_Sanitizes', 'sanitize_choices' ),
					'section'                => $title_section,
					'default'                => astra_get_option( $title_section . '-layout', 'layout-1' ),
					'priority'               => 5,
					'context'                => Astra_Builder_Helper::$general_tab,
					'title'                  => __( 'Banner Layout', 'astra' ),
					'divider'                => array( 'ast_class' => 'ast-section-spacing ast-bottom-spacing' ),
					'choices'                => array(
						'layout-1' => array(
							'label' => __( 'Layout 1', 'astra' ),
							'path'  => Astra_Builder_UI_Controller::fetch_svg_icon( 'post-layout' ),
						),
						'layout-2' => array(
							'label' => __( 'Layout 2', 'astra' ),
							'path'  => '<span class="ahfb-svg-iconset ast-inline-flex"><svg width="100" height="70" viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10 12C10 10.8954 10.8954 10 12 10H88C89.1046 10 90 10.8954 90 12V70H10V12Z" fill="white"></path> <mask id="' . esc_attr( $title_section ) . '-masking" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="10" y="10" width="80" height="60"> <path d="M10 12C10 10.8954 10.8954 10 12 10H88C89.1046 10 90 10.8954 90 12V70H10V12Z" fill="white"></path> </mask> <g mask="url(#' . esc_attr( $title_section ) . '-masking)"> <path d="M2 9H95V35H2V9Z" fill="#DADDE2"></path> </g> <path fill-rule="evenodd" clip-rule="evenodd" d="M83 58H16V56H83V58Z" fill="#E9EAEE"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M83 64H16V62H83V64Z" fill="#E9EAEE"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M61 21H41V19H61V21Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4 25H33V23H53.4V25Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M67 25H54.76V23H67V25Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M42.4783 29H40V28H42.4783V29Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M50.7391 29H47.4348V28H50.7391V29Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M46.6087 29H43.3044V28H46.6087V29Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M54.8696 29H51.5652V28H54.8696V29Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M59 29H55.6956V28H59V29Z" fill="white"></path> <rect x="16" y="40" width="67" height="12" fill="#E9EAEE"></rect> </svg></span>',
						),
					),
					'contextual_sub_control' => true,
					'input_attrs'            => array(
						'dependents' => array(
							'layout-1' => array( $title_section . '-empty-layout-message', $title_section . '-article-featured-image-position-layout-1', $title_section . '-article-featured-image-width-type' ),
							'layout-2' => array( $title_section . '-featured-as-background', $title_section . '-banner-featured-overlay', $title_section . '-image-position', $title_section . '-featured-help-notice', $title_section . '-article-featured-image-position-layout-2' ),
						),
					),
				),

				array(
					'name'       => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-width-type]',
					'type'       => 'control',
					'control'    => 'ast-selector',
					'section'    => $title_section,
					'default'    => astra_get_option( $title_section . '-banner-width-type', 'fullwidth' ),
					'priority'   => 10,
					'title'      => __( 'Container Width', 'astra' ),
					'choices'    => array(
						'fullwidth' => __( 'Full Width', 'astra' ),
						'custom'    => __( 'Custom', 'astra' ),
					),
					'divider'    => array( 'ast_class' => 'ast-top-divider ast-bottom-spacing' ),
					'responsive' => false,
					'renderAs'   => 'text',
					'context'    => array(
						Astra_Builder_Helper::$general_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $title_section . '-layout]',
							'operator' => '===',
							'value'    => 'layout-2',
						),
					),
				),

				array(
					'name'        => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-custom-width]',
					'type'        => 'control',
					'control'     => 'ast-slider',
					'section'     => $title_section,
					'transport'   => 'postMessage',
					'default'     => astra_get_option( $title_section . '-banner-custom-width', 1200 ),
					'context'     => array(
						Astra_Builder_Helper::$general_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $title_section . '-layout]',
							'operator' => '===',
							'value'    => 'layout-2',
						),
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-width-type]',
							'operator' => '===',
							'value'    => 'custom',
						),
					),
					'priority'    => 15,
					'title'       => __( 'Custom Width', 'astra' ),
					'suffix'      => 'px',
					'input_attrs' => array(
						'min'  => 768,
						'step' => 1,
						'max'  => 1920,
					),
				),

				array(
					'name'              => ASTRA_THEME_SETTINGS . '[' . $title_section . '-structure]',
					'type'              => 'control',
					'control'           => 'ast-sortable',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_multi_choices' ),
					'section'           => $title_section,
					'context'           => Astra_Builder_Helper::$general_tab,
					'default'           => astra_get_option( $title_section . '-structure' ),
					'priority'          => 20,
					'title'             => __( 'Structure', 'astra' ),
					'divider'           => ( 'post' !== $post_type ) ? array( 'ast_class' => 'ast-top-divider ast-bottom-spacing' ) : array( 'ast_class' => 'ast-bottom-spacing' ),
					'choices'           => $archive_structure_choices,
				),

				array(
					'name'     => $title_section . '-custom-title',
					'parent'   => ASTRA_THEME_SETTINGS . '[' . $title_section . '-structure]',
					'default'  => astra_get_option( $title_section . '-custom-title' ),
					'linked'   => $title_section . '-title',
					'type'     => 'sub-control',
					'control'  => 'ast-text-input',
					'settings' => array(),
					'section'  => $title_section,
					'priority' => 1,
					'title'    => __( 'Text', 'astra' ),
				),

				array(
					'name'        => $title_section . '-custom-description',
					'parent'      => ASTRA_THEME_SETTINGS . '[' . $title_section . '-structure]',
					'default'     => astra_get_option( $title_section . '-custom-description' ),
					'linked'      => $title_section . '-description',
					'type'        => 'sub-control',
					'control'     => 'ast-text-input',
					'input_attrs' => array(
						'textarea' => true,
					),
					'section'     => $title_section,
					'priority'    => 1,
					'title'       => __( 'Text', 'astra' ),
				),

				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $title_section . '-horizontal-alignment]',
					'default'   => astra_get_option( $title_section . '-horizontal-alignment' ),
					'type'      => 'control',
					'control'   => 'ast-selector',
					'section'   => $title_section,
					'priority'  => 21,
					'title'     => __( 'Horizontal Alignment', 'astra' ),
					'context'   => Astra_Builder_Helper::$general_tab,
					'transport' => 'postMessage',
					'choices'   => array(
						'left'   => 'align-left',
						'center' => 'align-center',
						'right'  => 'align-right',
					),
					'divider'   => array( 'ast_class' => 'ast-top-divider' ),
				),
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[' . $title_section . '-vertical-alignment]',
					'default'    => astra_get_option( $title_section . '-vertical-alignment', 'center' ),
					'type'       => 'control',
					'control'    => 'ast-selector',
					'section'    => $title_section,
					'priority'   => 22,
					'title'      => __( 'Vertical Alignment', 'astra' ),
					'choices'    => array(
						'flex-start' => __( 'Top', 'astra' ),
						'center'     => __( 'Middle', 'astra' ),
						'flex-end'   => __( 'Bottom', 'astra' ),
					),
					'divider'    => array( 'ast_class' => 'ast-top-divider ast-section-spacing' ),
					'context'    => array(
						Astra_Builder_Helper::$general_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $title_section . '-layout]',
							'operator' => '===',
							'value'    => 'layout-2',
						),
					),
					'transport'  => 'postMessage',
					'renderAs'   => 'text',
					'responsive' => false,
				),
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-height]',
					'type'              => 'control',
					'control'           => 'ast-responsive-slider',
					'section'           => $title_section,
					'transport'         => 'postMessage',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_slider' ),
					'default'           => astra_get_option( $title_section . '-banner-height', Astra_Posts_Structure_Loader::get_customizer_default( 'responsive-slider' ) ),
					'context'           => array(
						Astra_Builder_Helper::$design_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $title_section . '-layout]',
							'operator' => '===',
							'value'    => 'layout-2',
						),
					),
					'priority'          => 1,
					'title'             => __( 'Banner Min Height', 'astra' ),
					'suffix'            => 'px',
					'input_attrs'       => array(
						'min'  => 0,
						'step' => 1,
						'max'  => 1000,
					),
					'divider'           => array( 'ast_class' => 'ast-bottom-divider ast-section-spacing' ),
				),
				array(
					'name'        => ASTRA_THEME_SETTINGS . '[' . $title_section . '-elements-gap]',
					'type'        => 'control',
					'control'     => 'ast-slider',
					'section'     => $title_section,
					'transport'   => 'postMessage',
					'default'     => astra_get_option( $title_section . '-elements-gap', 10 ),
					'context'     => Astra_Builder_Helper::$design_tab,
					'priority'    => 5,
					'title'       => __( 'Inner Elements Spacing', 'astra' ),
					'suffix'      => 'px',
					'input_attrs' => array(
						'min'  => 0,
						'step' => 1,
						'max'  => 100,
					),
					'divider'     => array( 'ast_class' => 'ast-bottom-divider ast-section-spacing' ),
				),
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-image-type]',
					'type'       => 'control',
					'control'    => 'ast-selector',
					'section'    => $title_section,
					'default'    => astra_get_option( $title_section . '-banner-image-type', 'none' ),
					'priority'   => 5,
					'context'    => Astra_Builder_Helper::$design_tab,
					'title'      => __( 'Container Background', 'astra' ),
					'choices'    => array(
						'none'   => __( 'None', 'astra' ),
						'custom' => __( 'Custom', 'astra' ),
					),
					'divider'    => array( 'ast_class' => 'ast-section-spacing ast-bottom-spacing' ),
					'responsive' => false,
					'renderAs'   => 'text',
				),
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-custom-bg]',
					'default'   => astra_get_option( $title_section . '-banner-custom-bg', Astra_Posts_Structure_Loader::get_customizer_default( 'responsive-background' ) ),
					'type'      => 'control',
					'control'   => 'ast-responsive-background',
					'section'   => $title_section,
					'title'     => __( 'Background', 'astra' ),
					'transport' => 'postMessage',
					'priority'  => 5,
					'context'   => array(
						Astra_Builder_Helper::$design_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-image-type]',
							'operator' => '===',
							'value'    => 'custom',
						),
					),
				),
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-title-color]',
					'type'      => 'control',
					'control'   => 'ast-color',
					'section'   => $title_section,
					'default'   => astra_get_option( $title_section . '-banner-title-color' ),
					'transport' => 'postMessage',
					'priority'  => 9,
					'title'     => __( 'Title Color', 'astra' ),
					'divider'   => array( 'ast_class' => 'ast-top-divider ast-top-spacing' ),
					'context'   => Astra_Builder_Helper::$design_tab,
				),
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-text-color]',
					'type'      => 'control',
					'control'   => 'ast-color',
					'section'   => $title_section,
					'default'   => astra_get_option( $title_section . '-banner-text-color' ),
					'priority'  => 10,
					'title'     => __( 'Text Color', 'astra' ),
					'transport' => 'postMessage',
					'context'   => Astra_Builder_Helper::$design_tab,
				),
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-link-color]',
					'type'      => 'control',
					'control'   => 'ast-color',
					'section'   => $title_section,
					'default'   => astra_get_option( $title_section . '-banner-link-color' ),
					'transport' => 'postMessage',
					'priority'  => 15,
					'title'     => __( 'Link Color', 'astra' ),
					'context'   => Astra_Builder_Helper::$design_tab,
				),
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-link-hover-color]',
					'type'      => 'control',
					'control'   => 'ast-color',
					'section'   => $title_section,
					'default'   => astra_get_option( $title_section . '-banner-link-hover-color' ),
					'transport' => 'postMessage',
					'priority'  => 20,
					'title'     => __( 'Link Hover Color', 'astra' ),
					'context'   => Astra_Builder_Helper::$design_tab,
					'divider'   => array( 'ast_class' => 'ast-bottom-spacing' ),
				),
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-title-typography-group]',
					'type'      => 'control',
					'priority'  => 22,
					'control'   => 'ast-settings-group',
					'context'   => array(
						Astra_Builder_Helper::$design_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $title_section . '-structure]',
							'operator' => 'contains',
							'value'    => $title_section . '-title',
						),
					),
					'divider'   => array( 'ast_class' => 'ast-top-divider' ),
					'title'     => __( 'Title Font', 'astra' ),
					'section'   => $title_section,
					'transport' => 'postMessage',
				),
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-text-typography-group]',
					'type'      => 'control',
					'priority'  => 25,
					'control'   => 'ast-settings-group',
					'context'   => Astra_Builder_Helper::$design_tab,
					'title'     => __( 'Text Font', 'astra' ),
					'divider'   => array( 'ast_class' => 'ast-bottom-spacing' ),
					'section'   => $title_section,
					'transport' => 'postMessage',
				),
				array(
					'name'      => $title_section . '-text-font-family',
					'parent'    => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-text-typography-group]',
					'section'   => $title_section,
					'type'      => 'sub-control',
					'control'   => 'ast-font',
					'font_type' => 'ast-font-family',
					'default'   => astra_get_option( $title_section . '-text-font-family', 'inherit' ),
					'title'     => __( 'Font Family', 'astra' ),
					'connect'   => ASTRA_THEME_SETTINGS . '[' . $title_section . '-text-font-weight]',
					'divider'   => array( 'ast_class' => 'ast-sub-bottom-dotted-divider' ),
				),
				array(
					'name'              => $title_section . '-text-font-weight',
					'parent'            => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-text-typography-group]',
					'section'           => $title_section,
					'type'              => 'sub-control',
					'control'           => 'ast-font',
					'font_type'         => 'ast-font-weight',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_font_weight' ),
					'default'           => astra_get_option( $title_section . '-text-font-weight', 'inherit' ),
					'title'             => __( 'Font Weight', 'astra' ),
					'connect'           => $title_section . '-text-font-family',
					'divider'           => array( 'ast_class' => 'ast-sub-bottom-dotted-divider' ),
				),
				array(
					'name'              => $title_section . '-text-font-size',
					'parent'            => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-text-typography-group]',
					'section'           => $title_section,
					'type'              => 'sub-control',
					'control'           => 'ast-responsive-slider',
					'default'           => astra_get_option( $title_section . '-text-font-size', Astra_Posts_Structure_Loader::get_customizer_default( 'font-size' ) ),
					'transport'         => 'postMessage',
					'title'             => __( 'Font Size', 'astra' ),
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_slider' ),
					'suffix'            => array( 'px', 'em' ),
					'input_attrs'       => array(
						'px' => array(
							'min'  => 0,
							'step' => 1,
							'max'  => 200,
						),
						'em' => array(
							'min'  => 0,
							'step' => 1,
							'max'  => 20,
						),
					),
				),
				array(
					'name'    => $title_section . '-text-font-extras',
					'parent'  => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-text-typography-group]',
					'section' => $title_section,
					'type'    => 'sub-control',
					'control' => 'ast-font-extras',
					'default' => astra_get_option( $title_section . '-text-font-extras', Astra_Posts_Structure_Loader::get_customizer_default( 'font-extras' ) ),
					'title'   => __( 'Font Extras', 'astra' ),
				),
				array(
					'name'      => $title_section . '-title-font-family',
					'parent'    => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-title-typography-group]',
					'section'   => $title_section,
					'type'      => 'sub-control',
					'control'   => 'ast-font',
					'font_type' => 'ast-font-family',
					'default'   => astra_get_option( $title_section . '-title-font-family', 'inherit' ),
					'title'     => __( 'Font Family', 'astra' ),
					'connect'   => ASTRA_THEME_SETTINGS . '[' . $title_section . '-title-font-weight]',
					'divider'   => array( 'ast_class' => 'ast-sub-bottom-dotted-divider' ),
				),
				array(
					'name'              => $title_section . '-title-font-weight',
					'parent'            => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-title-typography-group]',
					'section'           => $title_section,
					'type'              => 'sub-control',
					'control'           => 'ast-font',
					'font_type'         => 'ast-font-weight',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_font_weight' ),
					'default'           => astra_get_option( $title_section . '-title-font-weight' ),
					'title'             => __( 'Font Weight', 'astra' ),
					'connect'           => $title_section . '-title-font-family',
					'divider'           => array( 'ast_class' => 'ast-sub-bottom-dotted-divider' ),
				),
				array(
					'name'              => $title_section . '-title-font-size',
					'parent'            => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-title-typography-group]',
					'section'           => $title_section,
					'type'              => 'sub-control',
					'control'           => 'ast-responsive-slider',
					'default'           => astra_get_option( $title_section . '-title-font-size' ),
					'transport'         => 'postMessage',
					'title'             => __( 'Font Size', 'astra' ),
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_slider' ),
					'suffix'            => array( 'px', 'em' ),
					'input_attrs'       => array(
						'px' => array(
							'min'  => 0,
							'step' => 1,
							'max'  => 200,
						),
						'em' => array(
							'min'  => 0,
							'step' => 1,
							'max'  => 20,
						),
					),
				),
				array(
					'name'    => $title_section . '-title-font-extras',
					'parent'  => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-title-typography-group]',
					'section' => $title_section,
					'type'    => 'sub-control',
					'control' => 'ast-font-extras',
					'default' => astra_get_option( $title_section . '-title-font-extras', Astra_Posts_Structure_Loader::get_customizer_default( 'font-extras' ) ),
					'title'   => __( 'Font Extras', 'astra' ),
				),
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-margin]',
					'default'           => astra_get_option( $title_section . '-banner-margin', Astra_Posts_Structure_Loader::get_customizer_default( 'responsive-spacing' ) ),
					'type'              => 'control',
					'control'           => 'ast-responsive-spacing',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_spacing' ),
					'section'           => $title_section,
					'divider'           => array( 'ast_class' => 'ast-top-divider' ),
					'title'             => __( 'Margin', 'astra' ),
					'linked_choices'    => true,
					'transport'         => 'postMessage',
					'unit_choices'      => array( 'px', 'em', '%' ),
					'choices'           => array(
						'top'    => __( 'Top', 'astra' ),
						'right'  => __( 'Right', 'astra' ),
						'bottom' => __( 'Bottom', 'astra' ),
						'left'   => __( 'Left', 'astra' ),
					),
					'context'           => Astra_Builder_Helper::$design_tab,
					'priority'          => 100,
					'connected'         => false,
				),
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[' . $title_section . '-banner-padding]',
					'default'           => astra_get_option( $title_section . '-banner-padding', ( class_exists( 'WooCommerce' ) && 'product' === $post_type ) ? Astra_Posts_Structure_Loader::get_customizer_default( 'responsive-spacing' ) : Astra_Posts_Structure_Loader::get_customizer_default( 'responsive-padding' ) ),
					'type'              => 'control',
					'control'           => 'ast-responsive-spacing',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_spacing' ),
					'section'           => $title_section,
					'title'             => __( 'Padding', 'astra' ),
					'linked_choices'    => true,
					'transport'         => 'postMessage',
					'unit_choices'      => array( 'px', 'em', '%' ),
					'choices'           => array(
						'top'    => __( 'Top', 'astra' ),
						'right'  => __( 'Right', 'astra' ),
						'bottom' => __( 'Bottom', 'astra' ),
						'left'   => __( 'Left', 'astra' ),
					),
					'context'           => Astra_Builder_Helper::$design_tab,
					'priority'          => 120,
					'connected'         => false,
				),

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
