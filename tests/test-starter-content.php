<?php
/**
 * Class Tests_Astra_StarterContent
 *
 * @package Astra
 */

/**
 * Tests get_theme_starter_content().
 *
 * @group themes
 */
class Tests_Astra_StarterContent extends WP_UnitTestCase {
	/**
	 * Testing Starter Content.
	 */
	public function test_default_content_sections() {

		$astra_starter_content = new Astra_Starter_Content();
		add_theme_support( 'starter-content', $astra_starter_content->get() );

		$hydrated_starter_content = $astra_starter_content->get();

		$this->assertSame( '{{logo}}', $hydrated_starter_content['theme_mods']['custom_logo'] );
		$this->assertSame( 'page', $hydrated_starter_content['options']['show_on_front'] );
		$this->assertSame( 'Logo', $hydrated_starter_content['attachments']['logo']['post_title'] );
		$this->assertSame( 'Primary', $hydrated_starter_content['nav_menus']['primary']['name'] );
		$this->assertSame( 'Primary', $hydrated_starter_content['nav_menus']['mobile_menu']['name'] );
		$this->assertSame( 'inc/assets/images/starter-content/logo.png', $hydrated_starter_content['attachments']['logo']['file'] );
	}
}
