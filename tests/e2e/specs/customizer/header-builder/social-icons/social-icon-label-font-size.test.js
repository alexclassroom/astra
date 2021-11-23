import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { responsiveFontSize } from '../../../../utils/responsive-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Social Icons show label in the customizer', () => {
	it( 'social icon color for desktop should apply correctly', async () => {
		const socialiconlabeFontsizel = {
			'header-social-1-label-toggle': '1',
			'font-size-section-hb-social-icons-1': {
				desktop: 72,
				'desktop-unit': 'px',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconlabeFontsizel );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap' );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'font-size',
		} ).cssValueToBe(
			`${ socialiconlabeFontsizel[ 'font-size-section-hb-social-icons-1' ].desktop }${ socialiconlabeFontsizel[ 'font-size-section-hb-social-icons-1' ][ 'desktop-unit' ] }`,
		);
	} );

	it( 'social icon color for tablet should apply correctly', async () => {
		const socialiconlabeFontsizel = {
			'header-social-1-label-toggle': '1',
			'font-size-section-hb-social-icons-1': {
				tablet: 42,
				'tablet-unit': 'px',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconlabeFontsizel );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await setBrowserViewport( 'medium' );

		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				socialiconlabeFontsizel[ 'font-size-section-hb-social-icons-1' ].tablet,
			) }${
				socialiconlabeFontsizel[ 'font-size-section-hb-social-icons-1' ][ 'tablet-unit' ]
			}`,
		);
	} );

	it( 'social icon color for mobile should apply correctly', async () => {
		const socialiconlabeFontsizel = {
			'header-social-1-label-toggle': '1',
			'font-size-section-hb-social-icons-1': {
				mobile: 42,
				'mobile-unit': 'px',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconlabeFontsizel );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await setBrowserViewport( 'small' );

		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				socialiconlabeFontsizel[ 'font-size-section-hb-social-icons-1' ].mobile,
			) }${
				socialiconlabeFontsizel[ 'font-size-section-hb-social-icons-1' ][ 'mobile-unit' ]
			}`,
		);
	} );
} );
