import React from "react";
import Layouts from "./Layouts";
import { Switch, Route } from "react-router-dom";
import { __ } from "@wordpress/i18n";

const Canvas = () => {
	return (
		<div className="ast-tb-canvas">
			<div className="ast-tb-canvas-body">
				<div className="ast-tb-canvas-header">
					<h2>{ __( 'Start customizing every part of your website.', 'astra' ) }</h2>
					<button
						className="ast-tb-btn ast-tb-btn-primary"
						onClick={() =>
							window.open(
								astra_theme_builder.astra_pricing_page_url,
								"_blank"
							)
						}
					>
						{ __( 'Upgrade', 'astra' ) }
					</button>
				</div>
				<div className="ast-tb-canvas-content">
					<Switch>
						<Route path="/">
							<Layouts />
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default Canvas;
