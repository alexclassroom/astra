import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
import { responsiveFontSize } from '../../../../utils/responsive-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Section title font option under the customizer', () => {
	it( 'section title font option should apply correctly', async () => {
		const sectionTitleFont = {
			'enable-related-posts': 1,
			'related-posts-section-title-font-family': "'Rouge Script', handwriting",
			'related-posts-section-title-text-transform': 'uppercase',
			'related-posts-section-title-font-weight': '400',
			'related-posts-section-title-font-size': {
				desktop: 60,
				tablet: 40,
				mobile: 20,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'related-posts-section-title-font-extras': {
				'letter-spacing': '2',
				'letter-spacing-unit': 'px',
				'line-height': '2',
				'line-height-unit': '',
				'text-decoration': 'line-through',
				'text-transform': 'uppercase',
			},
		};
		await setCustomize( sectionTitleFont );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'sample-post' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'test-post' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, 150 );
		} );
		await page.waitForSelector( '.ast-related-posts-title' );
		await expect( {
			selector: '.ast-related-posts-title',
			property: 'font-family',
		} ).cssValueToBe( `${ sectionTitleFont[ 'related-posts-section-title-font-family' ] }` );

		await expect( {
			selector: '.ast-related-posts-title',
			property: 'text-transform',
		} ).cssValueToBe( `${ sectionTitleFont[ 'related-posts-section-title-text-transform' ] }` );

		await expect( {
			selector: '.ast-related-posts-title',
			property: 'font-weight',
		} ).cssValueToBe( `${ sectionTitleFont[ 'related-posts-section-title-font-weight' ] }` );

		await expect( {
			selector: '.ast-related-posts-title',
			property: 'font-size',
		} ).cssValueToBe( `${ sectionTitleFont[ 'related-posts-section-title-font-size' ].desktop }${ sectionTitleFont[ 'related-posts-section-title-font-size' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-related-posts-title',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				sectionTitleFont[ 'related-posts-section-title-font-size' ].tablet,
			) }${
				sectionTitleFont[ 'related-posts-section-title-font-size' ][ 'tablet-unit' ]
			}`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-related-posts-title',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				sectionTitleFont[ 'related-posts-section-title-font-size' ].mobile,
			) }${
				sectionTitleFont[ 'related-posts-section-title-font-size' ][ 'mobile-unit' ]
			}`,
		);

		await expect( {
			selector: '.ast-related-posts-title',
			property: 'letter-spacing',
		} ).cssValueToBe( `${ sectionTitleFont[ 'related-posts-section-title-font-extras' ][ 'letter-spacing' ] }` + `${ sectionTitleFont[ 'related-posts-section-title-font-extras' ][ 'letter-spacing-unit' ] }` );

		await expect( {
			selector: '.ast-related-posts-title',
			property: 'text-decoration-line',
		} ).cssValueToBe( `${ sectionTitleFont[ 'related-posts-section-title-font-extras' ][ 'text-decoration' ] }` );

		await expect( {
			selector: '.ast-related-posts-title',
			property: 'text-transform',
		} ).cssValueToBe( `${ sectionTitleFont[ 'related-posts-section-title-font-extras' ][ 'text-transform' ] }` );
	} );
} );
