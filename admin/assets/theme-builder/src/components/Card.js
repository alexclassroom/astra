import React from "react";
import iconSVG from "../utils/svg";
import { useState } from "react";
import { __ } from "@wordpress/i18n";

function Card({ title, icon, layout, template, enabled }) {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const loadSVG = () => {
		switch (layout) {
			case "header":
				return iconSVG.Header;
			case "footer":
				return iconSVG.Footer;
			case "404-page":
				return iconSVG.Page_404;
			case "hooks":
				return iconSVG.Hooks;
			case "content":
				return iconSVG.Content;
			case "template":
				return template && "single" === template
					? iconSVG.Single
					: iconSVG.Archive;
			default:
				break;
		}
	};

	return (
		<div
			className="ast-tb-card-parent"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{icon && isHovered && (
				<div className="ast-tb-locked">
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
					<button
						className="ast-tb-card-hover-btn"
						onClick={() =>
							window.open(
								astra_theme_builder.astra_pricing_page_url
							)
						}
					>
						{__("Upgrade", "astra")}
					</button>
				</div>
			)}
			<div
				className={"ast-tb-card"}
			>
				<div
					className={`ast-tb-card-icon-wrapper ${
						isHovered ? "ast-tb-card-icon-wrapper-hover" : ""
					}`}
				>
					{icon ? icon : loadSVG()}
				</div>
				<div className="ast-tb-card-title-wrapper">
					<h3 className="ast-tb-card-title ast-tb-create-new-card-title">
						{title}
					</h3>
				</div>
			</div>
		</div>
	);
}

export default Card;
