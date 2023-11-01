import React from "react";
import Astra_Admin_Icons from "@Common/block-icons";
import { __ } from "@wordpress/i18n";
import apiFetch from '@wordpress/api-fetch';

const UpgradeToPro = () => {

	const getAstraProTitle = () => {
		return astra_admin.pro_installed_status ? __( 'Activate Now →', 'astra' ) : __( 'Upgrade Now →', 'astra' );
	}

	const onUpgradeProTrigger = ( e ) => {
		if( astra_admin.pro_installed_status ) {
			const formData = new window.FormData();
			formData.append( 'action', 'astra_recommended_plugin_activate' );
			formData.append( 'security', astra_admin.plugin_manager_nonce );
			formData.append( 'init', 'astra-addon/astra-addon.php' );
			e.target.innerText = astra_admin.plugin_activating_text;

			apiFetch( {
				url: astra_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( data ) => {
				if( data.success ) {
					window.open( astra_admin.astra_base_url, '_self' );
				}
			} );
		} else {
			window.open(
				astra_admin.upgrade_url,
				'_blank'
			);
		}
	};

	return (
		<div className="relative flex bg-blue-50 py-5 pl-4 pr-10 border border-sky-500 rounded-md">
			<div className="mr-3">
				{Astra_Admin_Icons['checkbadge']}
			</div>
			<div>
				<h4 className="text-base font-semibold leading-5 text-slate-800 mb-1.5">
					{__('Upgrade to Astra Pro', 'astra')}
				</h4>
				<p className="text-sm text-slate-600 mb-3">
					{__('Get access to powerful features for painless WordPress designing, without the high costs. With all the time you will save, it’s a product that pays for itself!', 'astra')}
				</p>
				<button onClick={ onUpgradeProTrigger } className="text-sm text-astra text-medium">
					{getAstraProTitle()}
				</button>
			</div>
			<div className="absolute top-4 right-4 leading-[1rem] font-medium text-[0.625rem] text-white bg-slate-800 rounded-[0.1875rem] py-[0rem] px-1.5">
				{__('PRO', 'astra')}
			</div>
		</div>
	);
};

export default UpgradeToPro;
