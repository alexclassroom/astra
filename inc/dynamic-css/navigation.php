<?php
/**
 * Post Navigation - Dynamic CSS
 *
 * @package Astra
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

add_filter( 'astra_dynamic_theme_css', 'astra_navigation_css', 11 );

/**
 * Post Navigation - Dynamic CSS
 *
 * @param  string $dynamic_css          Astra Dynamic CSS.
 * @return String Generated dynamic CSS for Post Navigation.
 *
 * @since x.x.x
 */
function astra_navigation_css( $dynamic_css ) {
	$mobile_breakpoint = strval( astra_get_mobile_breakpoint() );
	$navigation_css = '
		.single .post-navigation a p {
			margin-top: 0.5em;
			margin-bottom: 0;
			text-transform: initial;
			line-height: 1.65em;
			font-weight: normal;
		}
		.single .post-navigation a .ast-post-nav {
			font-weight: 600;
			display: block;
			text-transform: uppercase;
			font-size: 0.85em;
			letter-spacing: 0.05em;
		}
		.single .post-navigation a svg {
			top: .125em;
			width: 1em;
			height: 1em;
			position: relative;
			fill: currentColor;
		}
		@media( min-width: 320px ) {
			.single .post-navigation .nav-previous a {
				text-align: left;
				padding-right: 20px;
			}
			.single .post-navigation .nav-next a {
				text-align: right;
				padding-left: 20px;
			}
			.comment-navigation .nav-previous:after, .post-navigation .nav-previous:after {
				position: absolute;
				content: "";
				top: 25%;
				right: 0;
				width: 1px;
				height: 50%;
				background: var(--ast-single-post-border, var(--ast-border-color));
			}
		}
		@media( max-width: ' . $mobile_breakpoint . 'px ) {
			.single .post-navigation .nav-links {
				-js-display: inline-flex;
				display: inline-flex;
				width: 100%;
				padding-left: 20px;
				padding-right: 20px;
			}
			.single .post-navigation a p {
				display: none;
			}
			.single .post-navigation .nav-previous {
				margin-bottom: 0;
			}
		}
	';

	$dynamic_css .= Astra_Enqueue_Scripts::trim_css( $navigation_css );

	return $dynamic_css;
}
