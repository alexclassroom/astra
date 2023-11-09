<?php
/**
 * Class Palette_Presets_Test
 *
 * @package Astra
 */

/**
 * Color Presets.
 */
class Palette_Presets_Test extends WP_UnitTestCase {
	/**
	 * Testing Astra Color Preset 1.
	 */
	public function test_preset_1() {
		$presets = astra_get_palette_presets();
		$this->assertEquals(
			array(
				'#0067FF',
				'#005EE9',
				'#0F172A',
				'#364151',
				'#E7F6FF',
				'#FFFFFF',
				'#D1DAE5',
				'#070614',
				'#222222',
			),
			$presets['preset_1']
		);
	}

	/**
	 * Testing Astra Color Preset 2.
	 */
	public function test_preset_2() {
		$presets = astra_get_palette_presets();
		$this->assertEquals(
			array(
				'#6528F7',
				'#5511F8',
				'#0F172A',
				'#454F5E',
				'#F2F0FE',
				'#FFFFFF',
				'#D8D8F5',
				'#0D0614',
				'#222222',
			),
			$presets['preset_2']
		);
	}

	/**
	 * Testing Astra Color Preset 3.
	 */
	public function test_preset_3() {
		$presets = astra_get_palette_presets();
		$this->assertEquals(
			array(
				'#DD183B',
				'#CC1939',
				'#0F172A',
				'#3A3A3A',
				'#FFEDE6',
				'#FFFFFF',
				'#FFD1BF',
				'#140609',
				'#222222',
			),
			$presets['preset_3']
		);
	}

	/**
	 * Testing Astra Color Preset 4.
	 */
	public function test_preset_4() {
		$presets = astra_get_palette_presets();
		$this->assertEquals(
			array(
				'#54B435',
				'#379237',
				'#0F172A',
				'#2F3B40',
				'#EDFBE2',
				'#FFFFFF',
				'#D5EAD8',
				'#0C1406',
				'#222222',
			),
			$presets['preset_4']
		);
	}

	/**
	 * Testing Astra Color Preset 5.
	 */
	public function test_preset_5() {
		$presets = astra_get_palette_presets();
		$this->assertEquals(
			array(
				'#DCA54A',
				'#D09A40',
				'#0F172A',
				'#4A4A4A',
				'#FAF5E5',
				'#FFFFFF',
				'#F0E6C5',
				'#141004',
				'#222222',
			),
			$presets['preset_5']
		);
	}

	/**
	 * Testing Astra Color Preset 6.
	 */
	public function test_preset_6() {
		$presets = astra_get_palette_presets();
		$this->assertEquals(
			array(
				'#FB5FAB',
				'#EA559D',
				'#0F172A',
				'#454F5E',
				'#FCEEF5',
				'#FFFFFF',
				'#FAD8E9',
				'#140610',
				'#222222',
			),
			$presets['preset_6']
		);
	}

	/**
	 * Testing Astra Color Preset 7.
	 */
	public function test_preset_7() {
		$presets = astra_get_palette_presets();
		$this->assertEquals(
			array(
				'#1B9C85',
				'#178E79',
				'#0F172A',
				'#454F5E',
				'#EDF6EE',
				'#FFFFFF',
				'#D4F3D7',
				'#06140C',
				'#222222',
			),
			$presets['preset_7']
		);
	}

	/**
	 * Testing Astra Color Preset 8.
	 */
	public function test_preset_8() {
		$presets = astra_get_palette_presets();
		$this->assertEquals(
			array(
				'#FD9800',
				'#E98C00',
				'#0F172A',
				'#454F5E',
				'#FEF9E1',
				'#FFFFFF',
				'#F9F0C8',
				'#141006',
				'#222222',
			),
			$presets['preset_8']
		);
	}

	/**
	 * Testing Astra Color Preset 9.
	 */
	public function test_preset_9() {
		$presets = astra_get_palette_presets();
		$this->assertEquals(
			array(
				'#FF6210',
				'#F15808',
				'#1C0D0A',
				'#353535',
				'#FEF1E4',
				'#FFFFFF',
				'#E5D7D1',
				'#140B06',
				'#222222',
			),
			$presets['preset_9']
		);
	}

	/**
	 * Testing Astra Color Preset 10.
	 */
	public function test_preset_10() {
		$presets = astra_get_palette_presets();
		$this->assertEquals(
			array(
				'#737880',
				'#65696F',
				'#151616',
				'#393C40',
				'#F6F6F6',
				'#FFFFFF',
				'#F1F0F0',
				'#232529',
				'#222222',
			),
			$presets['preset_10']
		);
	}
}
