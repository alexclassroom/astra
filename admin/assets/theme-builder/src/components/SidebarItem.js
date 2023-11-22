// SidebarItem.js
import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SidebarItem = ({ label, icon, layout, template }) => {
	const location = useLocation();
	const [isSelected, setIsSelected] = useState(false);
	const query = new URLSearchParams(location.search);
	const page = query.get("page");
	const path = query.get("path");

	// Check if the current pathname matches the link pathname
	const isSelectedItem = "theme-builder" === page && layout === path;

	// Update isSelected state when the item is selected
	useEffect(() => {
		setIsSelected(isSelectedItem);
	}, [path, layout]);

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
		<>
			<div
				className={`ast-tb-sidebar-item ${selectedClass}`}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div className="ast-tb-sidebar-item-left">
					<span className="ast-tb-sidebar-item-icon">{icon}</span>
					<span
						className={`ast-tb-sidebar-item-label ${
							label === "404 Page" || label === "Archive"
								? "ast-tb-sidebar-item-svg"
								: ""
						} `}
					>
						{label}
					</span>
				</div>
				<div className="ast-tb-sidebar-item-right">
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
		</>
	);
};

export default SidebarItem;
