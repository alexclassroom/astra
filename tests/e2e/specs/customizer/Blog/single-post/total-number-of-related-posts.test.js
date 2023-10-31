import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Single post option under the customizer', () => {
	it( 'total number of related post option should apply correctly', async () => {
		const numberOfPost = {
			'enable-related-posts': 1,
			'related-posts-total-count': 3,
		};
		await setCustomize( numberOfPost );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'post-1' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'post-2' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'post-3' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'post-4' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/post-1' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-related-posts-wrapper' );
		const posts = await page.$eval( '.ast-related-posts-wrapper', ( element ) => element.getAttribute( '.ast-single-related-posts-container .ast-related-posts-wrapper' ) );
		await expect( posts ).toBeNull( );
	} );
} );
