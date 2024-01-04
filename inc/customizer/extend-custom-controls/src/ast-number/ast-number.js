import { __experimentalNumberControl as NumberControl } from "@wordpress/components";
import PropTypes from "prop-types";
import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import parse from "html-react-parser";
import svgIcons from "../../../../../assets/svg/svgs.json";
import {Dashicon} from '@wordpress/components';

const NumberComponent = (props) => {
	const { description, input_attrs, responsive, title, qty_selector } =
		props.control.params;
	const defaultValue = props?.control?.setting?.get()
		? props.control.setting.get()
		: "";

	let defaultFallback;

	if( responsive ) {
		defaultFallback = {
			desktop: 1,
			tablet: 1,
			mobile: 1,
		}
	} else {
		defaultFallback = 1;
	}

	let min = input_attrs?.min ? input_attrs?.min : 1;
	min = min > 0 ? min : 1;
	const max = input_attrs?.max ? input_attrs?.max : 100;
	const step = input_attrs?.step ? input_attrs?.step : 1;

	if (responsive) {
		defaultValue.desktop = defaultValue?.desktop ? defaultValue.desktop : 1;
		defaultValue.tablet = defaultValue?.tablet ? defaultValue.tablet : 1;
		defaultValue.mobile = defaultValue?.mobile ? defaultValue.mobile : 1;
	}

	const defValue = responsive ? defaultValue : parseInt(defaultValue);

	const [value, setValue] = useState(
		defaultValue ? defValue : defaultFallback
	);
	
	const [ numberState, setNumberState ] = useState( defaultValue );

	const handleChange = event => {
		props.control.setting.set(event.target.value);
		setNumberState( event.target.value );
	};

	const saveValue = (current, key="") => {
		const currentInt = parseInt(current);

		if (responsive) {
			const obj = {
				...value,
			};
			obj[key] = currentInt;
			props.control.setting.set(obj);
			setValue(obj);
		} else {
			setValue(currentInt);
			props.control.setting.set(currentInt);
		}
	};
	const handlePlusMinus = ( type, key = "") => {
		const obj = {
			...value,
		};

		if ("plus" === type) {
			if (responsive) {
				if (max > value[key]) {
					obj[key] = value[key] + 1;
					setValue(obj);
				}
			} else {
				if (max > value) {
					setValue((current) => current + 1);
				}
			}
		} else {
			if (responsive) {
				if (min < value[key]) {
					obj[key] = value[key] - 1;
					setValue(obj);
				}
			} else {
				if (min < value) {
					setValue((current) => current - 1);
				}
			}
		}
	};


	useEffect(() => {
		setValue(value);
		props.control.setting.set(value);
	  },[value])



	const renderSettings = (key) => {
		let plus;
		let minus;

		if (responsive) {
			plus = () => handlePlusMinus("plus", key);
			minus = () => handlePlusMinus("minus", key);
		} else {
			plus = () => handlePlusMinus("plus");
			minus = () => handlePlusMinus("minus");
		}

		return (
			<>
				<div className="minus" onClick={minus}>
					<Dashicon icon='minus'/>
				</div>
				<NumberControl
					isShiftStepEnabled={true}
					onChange={(current) => saveValue(current, key)}
					shiftStep={step}
					value={responsive ? value[key] : value}
					max={max}
					min={min}
					step={step}
				/>
				<div className="plus" onClick={plus}>
					<Dashicon icon='plus'/>
				</div>
			</>
		);
	};

	let labelHtml = null;
	let descriptionHtml = null;
	let responsiveHtml = null;
	let inputHtml = null;

	if (title) {
		labelHtml = (<span className="ast-control-label">{title}</span>);
	}

	if (description) {
		descriptionHtml = (
			<span className="description customize-control-description">
				{description}
			</span>
		);
	}

	if (responsive) {
		const responsiveDesktop = parse(svgIcons["desktop-responsive"]);
		const responsiveTablet = parse(svgIcons["tablet-responsive"]);
		const responsiveMobile = parse(svgIcons["mobile-responsive"]);

		responsiveHtml = (
			<ul className="ast-responsive-btns">
				<li className="desktop active">
					<button
						type="button"
						className="preview-desktop"
						data-device="desktop"
					>
						{responsiveDesktop}
					</button>
				</li>
				<li className="tablet">
					<button
						type="button"
						className="preview-tablet"
						data-device="tablet"
					>
						{responsiveTablet}
					</button>
				</li>
				<li className="mobile">
					<button
						type="button"
						className="preview-mobile"
						data-device="mobile"
					>
						{responsiveMobile}
					</button>
				</li>
			</ul>
		);

		inputHtml = (
			<>
				<div className="ast-input-res-wrapper ast-number-wrapper">
					<div className="ast-responsive-container ast-number-single desktop active">
						{renderSettings("desktop")}
					</div>
					<div className="ast-responsive-container ast-number-single tablet">
						{renderSettings("tablet")}
					</div>
					<div className="ast-responsive-container ast-number-single mobile">
						{renderSettings("mobile")}
					</div>
				</div>
			</>
		);
	} else {
		inputHtml = (
			<>
				<div className="ast-number-single desktop active">
					{renderSettings()}
				</div>
			</>
		);
	}

	if( qty_selector ) {
		return (
			<>
				<div className="ast-control-wrapper">
					<div className="ast-title-wrapper">
						{labelHtml}
						{responsiveHtml}
					</div>
					<div className="ast-control-wrapper">
						{inputHtml}
					</div>
				</div>
				{descriptionHtml}
			</>
		);
	} else {
		return (
			<label className='customizer-text'>
				<input
					type="number"
					value={ numberState }
					onChange={ handleChange }
				/>
			</label>
		);
	}
};

NumberComponent.propTypes = {
	control: PropTypes.object.isRequired,
};

export default React.memo(NumberComponent);
