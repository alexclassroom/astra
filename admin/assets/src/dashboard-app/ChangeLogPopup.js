import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { __ } from "@wordpress/i18n";
import Astra_Admin_Icons from "@Common/block-icons";

const tabs = wp.hooks.applyFilters( 'astra_dashboard.changelog_products', [
	{ name: "Astra Theme", value: "astra-theme" },
] );

const ChangeLogPopup = () => {
	const [open, setOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("astra-theme");

	const [activeChangeLog, setActiveChangeLog] = useState(
		astra_admin.astra_changelog_data
	);

	const toggleTab = (value) => {
		setActiveTab(value);
		if( value === 'astra-pro' ) {
			setActiveChangeLog(astra_addon_admin.astra_pro_changelog_data);
		} else {
			setActiveChangeLog(astra_admin.astra_changelog_data);
		}
	};

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				title={__("What's New?", "astra")}
				className="w-8 sm:w-10 h-8 sm:h-10 flex items-center whitespace-nowrap justify-center cursor-pointer rounded-full border border-slate-200"
			>
				{Astra_Admin_Icons['horn']}
			</button>
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 overflow-hidden"
					onClose={setOpen}
				>
					<div className="absolute inset-0 overflow-hidden">
						<Dialog.Overlay className="absolute inset-0" />

						<div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:mt-[2rem] ast-changelog-popup-wrap">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-150 sm:duration-150"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-300 sm:duration-300"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<div className="w-screen max-w-md shadow-overlay-left">
									<div className="h-full flex flex-col bg-white shadow-xl">
										<div className="px-4 sm:px-6 h-16 shadow flex items-center justify-between z-50">
											<Dialog.Title className="text-lg font-medium text-gray-900">
												{" "}
												{__(
													"What's New?",
													"astra"
												)}{" "}
											</Dialog.Title>
											<div className="flex items-center">
												<button
													type="button"
													className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
													onClick={() =>
														setOpen(false)
													}
												>
													<XIcon
														className="h-6 w-6"
														aria-hidden="true"
													/>
												</button>
											</div>
										</div>

										{ astra_admin.pro_available &&
											<div className="block">
												<div className="border-b border-gray-200">
													<nav
														className="-mb-px flex space-x-8 px-6"
														aria-label="Tabs"
													>
														{tabs.map((tab) => (
															<button
																key={tab.name}
																className={`${
																	activeTab ===
																	tab.value
																		? "border-astra text-astra"
																		: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
																}
																	whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
																onClick={() =>
																	toggleTab(
																		tab.value
																	)
																}
															>
																{tab.name}
															</button>
														))}
													</nav>
												</div>
											</div>
										}

										<div className="relative flex-1 overflow-y-auto">
											<div className="relative grid bg-white divide-y divide-gray-200">
												{activeChangeLog.map(
													(item, index) => {
														const title =
															activeChangeLog[
																index
															].title;
														const description =
															activeChangeLog[
																index
															].description;
														const link =
															item.product === 97 ? "https://wpastra.com/product/astra-theme/?utm_source=wp&utm_medium=dashboard" : "https://wpastra.com/product/astra-pro-addon/?utm_source=wp&utm_medium=dashboard";
														const pubDate =
															activeChangeLog[
																index
															].date;

														return (
															<a
																key={title}
																href={link}
																className="px-6 py-5 block rounded-[0.2rem] transition ease-in-out duration-150"
																target={
																	"_blank"
																}
																rel={
																	"noreferrer noopener"
																}
															>
																<p
																	className="text-sm mb-1 font-medium text-slate-800"
																	dangerouslySetInnerHTML={{
																		__html: title,
																	}}
																></p>
																<p
																	className="text-xs text-slate-500"
																	dangerouslySetInnerHTML={{
																		__html: pubDate,
																	}}
																></p>
																<p
																	className="mt-3 astra-changelog-description"
																	dangerouslySetInnerHTML={{
																		__html: description,
																	}}
																></p>
															</a>
														);
													}
												)}
											</div>
										</div>
									</div>
								</div>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default ChangeLogPopup;
