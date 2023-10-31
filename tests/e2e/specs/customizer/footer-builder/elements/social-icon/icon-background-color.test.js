import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Social icons in the customizer', () => {
	it( 'icon background color should apply correctly', async () => {
		const socialIconBackColor = {
			'footer-social-1-bg-color': {
				desktop: 'rgb(244, 191, 191)',
				tablet: 'rgb(195, 237, 111)',
				mobile: 'rgb(214, 210, 165)',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( socialIconBackColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-footer-social-1-wrap .ast-builder-social-element' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe( `${ socialIconBackColor[ 'footer-social-1-bg-color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-footer-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe( `${ socialIconBackColor[ 'footer-social-1-bg-color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-footer-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe( `${ socialIconBackColor[ 'footer-social-1-bg-color' ].mobile }` );
	} );
} );
