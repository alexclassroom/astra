import { useState , useEffect } from 'react';

const { __ } = wp.i18n;
const {Dashicon, Tooltip, TextControl, Button } = wp.components;
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import astIcons from "../../../../../assets/svg/ast-social-icons"
import renderSVG from "../../../../assets/js/ast-render-svg"


let svg_icons = Object.keys( astIcons )

const ItemComponent = props => {

	const Icons = window.svgIcons;
	const [state, setState] = useState({
		open: false,
	});

	const icon = props.item.id.replace(/[\d_]+$/g, ''); // Regex to replace numeric chars with empty string.
	const urlLabel = ( 'phone' === props.item.id || 'phone_2' === props.item.id ) ? __('Number', 'astra') : __('URL', 'astra');

	const[ selectedIcon , setSelectedIcon ] = useState(
		props.item.icon
	)

	useEffect(() => {
		setSelectedIcon( Icons[props.item.icon] );
	}, []);

	return (
		<div
			className="ahfb-sorter-item"
			data-id={props.item.id}
			key={props.item.id}
		>
			<div
				className="ahfb-sorter-item-panel-header"
				onClick={() => {
					setState((prevState) => ({
						...prevState,
						open: state.open ? false : true,
					}));
				}}
			>
				<Button className="ahfb-sorter-visiblity">
					<span
						dangerouslySetInnerHTML={{
							__html: selectedIcon,
						}}
					/>
				</Button>
				<span className="ahfb-sorter-title">
					{undefined !== props.item.label && "" !== props.item.label
						? props.item.label
						: __("Social Item", "astra")}
				</span>
				<Button
					className="ahfb-sorter-item-expand"
					onClick={() => {
						setState((prevState) => ({
							...prevState,
							open: state.open ? false : true,
						}));
					}}
				>
					{state.open ? (
						<Dashicon icon="arrow-up-alt2" />
					) : (
						<Dashicon icon="arrow-down-alt2" />
					)}
				</Button>
				<Tooltip text={__("Toggle Item Visiblity", "astra")}>
					<Button
						className={`ahfb-sorter-item-expand ahfb-sorter-item-visibility ${
							props.item.enabled
								? "item-is-visible"
								: "item-is-hidden"
						}`}
						onClick={(e) => {
							e.stopPropagation();
							props.toggleEnabled(
								props.item.enabled ? false : true,
								props.index
							);
						}}
					>
						<Dashicon icon="visibility" />
					</Button>
				</Tooltip>
				<Button
					className="ahfb-sorter-item-remove"
					isDestructive
					onClick={() => {
						props.removeItem(props.index);
					}}
				>
					<Dashicon icon="no-alt" />
				</Button>
			</div>
			{state.open && (
				<div className="ahfb-sorter-item-panel-content">
					<TextControl
						label={__("Label", "astra")}
						value={props.item.label ? props.item.label : ""}
						onChange={(value) => {
							props.onChangeLabel(value, props.index);
						}}
					/>

					{!props.is_sharing_mode && (
						<TextControl
							label={`${urlLabel}`}
							value={props.item.url ? props.item.url : ""}
							onChange={(value) => {
								props.onChangeURL(value, props.index);
							}}
						/>
					)}
					<p className="ast-social-icon-picker-label">{__("Icon")}</p>
					<FontIconPicker
						icons={svg_icons}
						renderFunc={renderSVG}
						theme="default"
						value={props.item.icon}
						onChange={(value) => {
							props.onChangeIcon(value, props.index);
							setSelectedIcon(Icons[value]);
						}}
						isMulti={false}
						noSelectedPlaceholder={__("Select Icon", "astra")}
					/>
				</div>
			)}
		</div>
	);
};
export default ItemComponent;
