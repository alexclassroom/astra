// Sidebar.js
import React from "react";
import SidebarItem from "./SidebarItem";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";

const Sidebar = ({ items }) => {
	const location = useLocation();
	const [isSelected, setIsSelected] = useState(false);
	const query = new URLSearchParams(location.search);
	const page = query.get("page");
	const path = query.get("path");

	// Check if the current pathname matches the link pathname
	const isSelectedItem = "theme-builder" === page && "all-layouts" === path;

	// Update isSelected state when the item is selected
	useEffect(() => {
		setIsSelected(isSelectedItem);
	}, [path]);

	// Define a CSS class for the selected item
	const selectedClass = isSelected ? "ast-tb-sidebar-item-selected" : "";

	const [isHovered, setIsHovered] = useState(false);
	const handleMouseEnter = () => {
		setIsHovered(true);
	};
	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div className="ast-tb-sidebar">
			{/** Sidebar Title */}
			<div
				className={`ast-tb-sidebar-header ${selectedClass}`}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div className="ast-tb-sidebar-header-left">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M2.39844 9.24418C2.39844 8.85015 2.59899 8.4805 2.93665 8.25215L11.2566 2.62564C11.7008 2.32531 12.2961 2.32531 12.7402 2.62564L21.0602 8.25216C21.3979 8.4805 21.5984 8.85015 21.5984 9.24418V19.7745C21.5984 20.7829 20.7388 21.6004 19.6784 21.6004H4.31844C3.25805 21.6004 2.39844 20.7829 2.39844 19.7745V9.24418Z"
							stroke="#4B5563"
							strokeWidth="2"
						/>
					</svg>
					<h2>{ __( 'All Layouts', 'astra' ) }</h2>
				</div>
				<div className="ast-tb-sidebar-header-right">
					{isHovered && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6"
						>
							<path
								fillRule="evenodd"
								d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
								clipRule="evenodd"
							/>
						</svg>
					)}
				</div>
			</div>

			{/** Sidebar Subtitle */}
			<div className="ast-tb-sidebar-subtitle">
				<h3>{ __( 'Website Parts', 'astra' ) }</h3>
			</div>
			{items.map((item, index) => (
				<SidebarItem
					key={index}
					label={item.label}
					icon={item.icon}
					layout={item.layout}
					template={item.template}
				/>
			))}

			{/** Sidebar Help */}
			<div className="ast-tb-help-divider"></div>
			<div
				className="ast-tb-sidebar-help ast-tb-sidebar-item"
				onClick={() =>
					window.open(
						astra_theme_builder.astra_docs_page_url,
						"_blank"
					)
				}
			>
				<svg
					width="24"
					height="25"
					viewBox="0 0 24 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M11.9974 17.3004V17.3426M9.59844 9.54572C9.59844 8.1952 10.673 7.10039 11.9984 7.10039C13.3239 7.10039 14.3984 8.1952 14.3984 9.54572C14.3984 10.8962 13.3239 11.991 11.9984 11.991C11.9984 11.991 11.9974 12.7209 11.9974 13.6213M21.5984 12.5004C21.5984 17.8023 17.3004 22.1004 11.9984 22.1004C6.6965 22.1004 2.39844 17.8023 2.39844 12.5004C2.39844 7.19846 6.6965 2.90039 11.9984 2.90039C17.3004 2.90039 21.5984 7.19846 21.5984 12.5004Z"
						stroke="#4B5563"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<span>{ __( 'Help', 'astra' ) }</span>
			</div>
		</div>
	);
};

export default Sidebar;
