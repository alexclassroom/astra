<?php
/**
 * Bottom Footer Options for Astra Theme.
 *
 * @package     Astra
 * @author      Astra
 * @copyright   Copyright (c) 2020, Astra
 * @link        https://wpastra.com/
 * @since       Astra 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Astra_Blog_Single_Layout_Configs' ) ) {

	/**
	 * Register Blog Single Layout Configurations.
	 */
	class Astra_Blog_Single_Layout_Configs extends Astra_Customizer_Config_Base {

		/**
		 * Register Blog Single Layout Configurations.
		 *
		 * @param Array                $configurations Astra Customizer Configurations.
		 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
		 * @since 1.4.3
		 * @return Array Astra Customizer Configurations with updated configurations.
		 */
		public function register_configuration( $configurations, $wp_customize ) {

			/** @psalm-suppress DocblockTypeContradiction */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			$tab_config = ( true === Astra_Builder_Helper::$is_header_footer_builder_active ) ? Astra_Builder_Helper::$design_tab : Astra_Builder_Helper::$general_tab;

			/** @psalm-suppress UndefinedClass */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			$article_size_description = defined( 'ASTRA_EXT_VER' ) && Astra_Ext_Extension::is_active( 'blog-pro' ) ? __( 'When "Custom" is selected, following Featured Image Sizes are applied.', 'astra-addon' ) : '';
			/** @psalm-suppress UndefinedClass */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

			$_configs = array(

				/**
				 * Option: Single Post Content Width
				 */
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[blog-single-width]',
					'type'       => 'control',
					'control'    => 'ast-selector',
					'section'    => 'section-blog-single',
					'default'    => astra_get_option( 'blog-single-width' ),
					'priority'   => 6,
					'title'      => __( 'Content Width', 'astra' ),
					'choices'    => array(
						'default' => __( 'Default', 'astra' ),
						'custom'  => __( 'Custom', 'astra' ),
					),
					'transport'  => 'postMessage',
					'responsive' => false,
					'divider'    => array( 'ast_class' => 'ast-top-section-divider' ),
					'renderAs'   => 'text',
				),

				/**
				 * Option: Enter Width
				 */
				array(
					'name'        => ASTRA_THEME_SETTINGS . '[blog-single-max-width]',
					'type'        => 'control',
					'control'     => 'ast-slider',
					'section'     => 'section-blog-single',
					'transport'   => 'postMessage',
					'default'     => astra_get_option( 'blog-single-max-width' ),
					'context'     => array(
						Astra_Builder_Helper::$general_tab_config,
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[blog-single-width]',
							'operator' => '===',
							'value'    => 'custom',
						),
					),
					'priority'    => 6,
					'title'       => __( 'Custom Width', 'astra' ),
					'suffix'      => 'px',
					'input_attrs' => array(
						'min'  => 768,
						'step' => 1,
						'max'  => 1920,
					),
					'divider'     => array( 'ast_class' => 'ast-top-dotted-divider' ),
				),

				/**
				 * Option: Divider
				 */
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[section-blog-single-spacing-divider]',
					'section'  => 'section-blog-single',
					'title'    => __( 'Post Spacing', 'astra' ),
					'type'     => 'control',
					'control'  => 'ast-heading',
					'priority' => 24,
					'context'  => $tab_config,
				),

				/**
				 * Option: Single Post Spacing
				 */
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[single-post-outside-spacing]',
					'default'           => astra_get_option( 'single-post-outside-spacing' ),
					'type'              => 'control',
					'control'           => 'ast-responsive-spacing',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_spacing' ),
					'section'           => 'section-blog-single',
					'title'             => __( 'Outside', 'astra' ),
					'linked_choices'    => true,
					'transport'         => 'postMessage',
					'unit_choices'      => array( 'px', 'em', '%' ),
					'choices'           => array(
						'top'    => __( 'Top', 'astra' ),
						'right'  => __( 'Right', 'astra' ),
						'bottom' => __( 'Bottom', 'astra' ),
						'left'   => __( 'Left', 'astra' ),
					),
					'priority'          => 25,
					'context'           => $tab_config,
					'divider'           => array( 'ast_class' => 'ast-section-spacing' ),
				),

				/**
				 * Option: Featured Image
				 */
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[single-post-article-featured-image-heading]',
					'section'  => 'section-blog-single',
					'title'    => __( 'Featured Image', 'astra-addon' ),
					'type'     => 'control',
					'control'  => 'ast-heading',
					'priority' => 6,
					'settings' => array(),
					'divider'  => array( 'ast_class' => 'ast-section-spacing' ),
				),
				array(
					'name'        => ASTRA_THEME_SETTINGS . '[article-featured-image]',
					'default'     => astra_get_option( 'article-featured-image' ),
					'type'        => 'control',
					'control'     => 'ast-toggle-control',
					'section'     => 'section-blog-single',
					'title'       => __( 'Banner Featured Image', 'astra-addon' ),
					'priority'    => 6,
					'description' => __( 'Have Featured Image above post article, to modernize your blog post.', 'astra-addon' ),
					'divider'     => array( 'ast_class' => 'ast-section-spacing' ),
				),
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[article-featured-image-position]',
					'type'       => 'control',
					'control'    => 'ast-selector',
					'section'    => 'section-blog-single',
					'default'    => astra_get_option( 'article-featured-image-position' ),
					'priority'   => 6,
					'title'      => __( 'Image Position', 'astra' ),
					'context'    => array(
						Astra_Builder_Helper::$general_tab_config,
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[article-featured-image]',
							'operator' => '===',
							'value'    => true,
						),
					),
					'choices'    => array(
						'above'  => __( 'Above', 'astra' ),
						'behind' => __( 'Behind', 'astra' ),
					),
					'responsive' => false,
					'divider'    => array( 'ast_class' => 'ast-top-dotted-divider' ),
					'renderAs'   => 'text',
				),
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[article-featured-image-width-type]',
					'type'       => 'control',
					'control'    => 'ast-selector',
					'section'    => 'section-blog-single',
					'default'    => astra_get_option( 'article-featured-image-width-type' ),
					'priority'   => 6,
					'title'      => __( 'Image Width', 'astra' ),
					'context'    => array(
						Astra_Builder_Helper::$general_tab_config,
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[article-featured-image]',
							'operator' => '===',
							'value'    => true,
						),
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[article-featured-image-position]',
							'operator' => '===',
							'value'    => 'behind',
						),
					),
					'choices'    => array(
						'wide' => __( 'Wide', 'astra' ),
						'full' => __( 'Full Width', 'astra' ),
					),
					'responsive' => false,
					'divider'    => array( 'ast_class' => 'ast-section-spacing' ),
					'renderAs'   => 'text',
				),
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[article-featured-image-ratio-type]',
					'default'    => astra_get_option( 'article-featured-image-ratio-type', '' ),
					'type'       => 'control',
					'section'    => 'section-blog-single',
					'priority'   => 6,
					'control'    => 'ast-selector',
					'title'      => __( 'Image Ratio', 'astra' ),
					'choices'    => array(
						''           => __( 'Original', 'astra' ),
						'predefined' => __( 'Predefined', 'astra' ),
						'custom'     => __( 'Custom', 'astra' ),
					),
					'divider'    => array( 'ast_class' => 'ast-top-dotted-divider' ),
					'context'    => array(
						Astra_Builder_Helper::$general_tab_config,
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[article-featured-image]',
							'operator' => '===',
							'value'    => true,
						),
					),
					'responsive' => false,
					'renderAs'   => 'text',
				),
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[article-featured-image-ratio-pre-scale]',
					'default'    => astra_get_option( 'article-featured-image-ratio-pre-scale' ),
					'type'       => 'control',
					'section'    => 'section-blog-single',
					'priority'   => 6,
					'control'    => 'ast-selector',
					'choices'    => array(
						'1/1'  => __( '1:1', 'astra' ),
						'4/3'  => __( '4:3', 'astra' ),
						'16/9' => __( '16:9', 'astra' ),
						'2/1'  => __( '2:1', 'astra' ),
					),
					'context'    => array(
						Astra_Builder_Helper::$general_tab_config,
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[article-featured-image]',
							'operator' => '===',
							'value'    => true,
						),
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[article-featured-image-ratio-type]',
							'operator' => '===',
							'value'    => 'predefined',
						),
					),
					'responsive' => false,
					'renderAs'   => 'text',
				),
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[article-featured-image-custom-scale-width]',
					'default'           => astra_get_option( 'article-featured-image-custom-scale-width', 16 ),
					'type'              => 'control',
					'control'           => 'ast-number',
					'section'           => 'section-blog-single',
					'priority'          => 6,
					'input_attrs'       => array(
						'style'       => 'text-align:center;',
						'placeholder' => __( 'Auto', 'astra-addon' ),
						'min'         => 1,
						'max'         => 1000,
					),
					'context'           => array(
						Astra_Builder_Helper::$general_tab_config,
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[article-featured-image]',
							'operator' => '===',
							'value'    => true,
						),
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[article-featured-image-ratio-type]',
							'operator' => '===',
							'value'    => 'custom',
						),
					),
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_number_n_blank' ),
				),
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[article-featured-image-custom-scale-height]',
					'default'           => astra_get_option( 'article-featured-image-custom-scale-height', 9 ),
					'type'              => 'control',
					'control'           => 'ast-number',
					'section'           => 'section-blog-single',
					'priority'          => 6,
					'input_attrs'       => array(
						'style'       => 'text-align:center;',
						'placeholder' => __( 'Auto', 'astra-addon' ),
						'min'         => 1,
						'max'         => 1000,
					),
					'context'           => array(
						Astra_Builder_Helper::$general_tab_config,
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[article-featured-image]',
							'operator' => '===',
							'value'    => true,
						),
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[article-featured-image-ratio-type]',
							'operator' => '===',
							'value'    => 'custom',
						),
					),
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_number_n_blank' ),
				),
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[article-featured-image-custom-image-scale-description]',
					'type'     => 'control',
					'control'  => 'ast-description',
					'section'  => 'section-blog-single',
					'priority' => 6,
					'label'    => '',
					'context'  => array(
						Astra_Builder_Helper::$general_tab_config,
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[article-featured-image]',
							'operator' => '===',
							'value'    => true,
						),
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[article-featured-image-ratio-type]',
							'operator' => '===',
							'value'    => 'custom',
						),
					),
					'help'     => sprintf( /* translators: 1: link open markup, 2: link close markup */ __( 'Calculate a personalized image ratio using this %1$s online tool %2$s for your image dimensions.', 'astra' ), '<a href="https://www.digitalrebellion.com/webapps/aspectcalc" target="_blank">', '</a>' ),
				),
				array(
					'name'        => ASTRA_THEME_SETTINGS . '[article-featured-image-size]',
					'default'     => astra_get_option( 'article-featured-image-size', 'large' ),
					'section'     => 'section-blog-single',
					'type'        => 'control',
					'priority'    => 6,
					'title'       => __( 'Image Size', 'astra' ),
					'divider'     => array( 'ast_class' => 'ast-top-dotted-divider' ),
					'control'     => 'ast-select',
					'choices'     => astra_get_site_image_sizes( true ),
					'description' => $article_size_description,
					'context'     => array(
						Astra_Builder_Helper::$general_tab_config,
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[article-featured-image]',
							'operator' => '===',
							'value'    => true,
						),
					),
				),
			);

			if ( true === Astra_Builder_Helper::$is_header_footer_builder_active ) {
				$_configs[] = array(
					'name'        => 'section-blog-single-ast-context-tabs',
					'section'     => 'section-blog-single',
					'type'        => 'control',
					'control'     => 'ast-builder-header-control',
					'priority'    => 0,
					'description' => '',
				);
			}

			$configurations = array_merge( $configurations, $_configs );

			return $configurations;
		}
	}
}

new Astra_Blog_Single_Layout_Configs();
