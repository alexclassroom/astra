import { __ } from '@wordpress/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from '@headlessui/react'
import apiFetch from '@wordpress/api-fetch';

function classNames( ...classes ) {
	return classes.filter( Boolean ).join( ' ' )
}

const BetaUpdates = () => {

	const dispatch = useDispatch();

	const enableBeta = useSelector( ( state ) => state.enableBeta );
	const enableBetaStatus = false === enableBeta ? false : true;

	const updateEnableBetaStatus = () => {

		let assetStatus;
		if ( enableBeta === false ) {
			assetStatus = true;
		} else {
			assetStatus = false;
		}

		dispatch( { type: 'UPDATE_BETA', payload: assetStatus } );

		const formData = new window.FormData();

		formData.append( 'action', 'astra_update_admin_setting' );
		formData.append( 'security', astra_admin.update_nonce );
		formData.append( 'key', 'enable_beta' );
		formData.append( 'value', assetStatus );

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			dispatch( { type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: 'Successfully saved!' } );
		} );
	};

	return (
		<section className='block border-b border-solid border-slate-200 px-12 py-8 justify-between'>
			<div className='mr-16 w-full flex items-center'>
				<h3 className="p-0 flex-1 justify-right inline-flex text-xl leading-8 font-semibold text-slate-800">
					{ __( 'Enable Beta', 'astra' ) }
				</h3>
				<Switch
					checked={ enableBetaStatus }
					onChange={ updateEnableBetaStatus }
					className={ classNames(
						enableBetaStatus ? 'bg-astra' : 'bg-slate-200',
						'relative inline-flex flex-shrink-0 h-5 w-[2.4rem] items-center border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					) }
				>
					<span
						aria-hidden="true"
						className={ classNames(
							enableBetaStatus ? 'translate-x-5' : 'translate-x-0',
							'pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
						) }
					/>
				</Switch>
			</div>
			<p className="mt-2 w-9/12 text-sm text-slate-500">
				{ __( 'Enable this option to turn on beta updates and be notified when a new beta version of Spectra is available. The beta version will not install automatically, you will have to install it when you get a notification. It is recommended to try beta on a test environment only.', 'astra' ) }
			</p>
		</section>
	);
};

export default BetaUpdates;
