import React, { useState } from "react";
import { __ } from "@wordpress/i18n";
import RollBackConfirmPopup from "./RollBackConfirmPopup";

const RollBack = () => {
	const previousVersions = [{ value: "2.2", label: "2.2" }];

	const [previousVersionSelect, setPreviousVersion] = useState(
		previousVersions[0].value
	);
	const [openPopup, setopenPopup] = useState(false);
	const [confirmPopup, setconfirmPopup] = useState(false);

	const rollbackButtonClickHandler = () => {
		setopenPopup(true);
	};

	return (
		<>
			<section className="block border-b border-solid border-slate-200 px-12 py-8 justify-between">
				<div className="mr-16 w-full flex items-center">
					<h3 className="p-0 flex-1 justify-right inline-flex text-xl leading-8 font-semibold text-slate-800">
						{__("Rollback to Previous Version", "astra")}
					</h3>
					<div className="flex justify-right">
						<select
							id="location"
							name="location"
							className="block h-9 mr-2 sm:text-sm spectra-admin__input-field spectra-admin__dropdown"
							onBlur={(e) => {
								setPreviousVersion(e.target.value);
							}}
						>
							{previousVersions.map((version) => {
								return (
									<option
										key={version.value}
										value={version.value}
									>
										{version.label}
									</option>
								);
							})}
						</select>
						<button
							type="button"
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra transition focus:bg-astra-hover hover:bg-astra-hover focus:outline-none h-9"
							onClick={rollbackButtonClickHandler}
						>
							{confirmPopup && (
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
							)}
							{__("Rollback", "astra")}
						</button>
					</div>
				</div>
				<p className="mt-2 w-9/12 text-sm text-slate-500">
					{
						// eslint-disable-next-line @wordpress/i18n-no-variables
						__(
							`Experiencing an issue with Spectra version ${astra_admin.plugin_ver}? Roll back to a previous version to help troubleshoot the issue.`,
							"astra"
						)
					}
				</p>
			</section>
			<RollBackConfirmPopup
				openPopup={openPopup}
				setopenPopup={setopenPopup}
				previousVersionSelect={previousVersionSelect}
				setconfirmPopup={setconfirmPopup}
			/>
		</>
	);
};

export default RollBack;
