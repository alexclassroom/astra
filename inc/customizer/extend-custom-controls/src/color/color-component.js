import PropTypes from 'prop-types';
import {Dashicon} from '@wordpress/components';
import AstraColorPickerControl from '../common/astra-color-picker-control';
import {useEffect, useState} from 'react';

const ColorComponent = props => {

	let value = props.control.setting.get();

	let defaultValue = props.control.params.default;

	const [state, setState] = useState({
		value: value,
	});

	const updateValues = (value) => {
		setState(prevState => ({
			...prevState,
			value: value
		}));
		props.control.setting.set(value);
	};

	const renderOperationButtons = () => {

		let resetFlag = true;
		const tempVal = state.value.replace( 'unset', '' );

		if ( JSON.stringify(tempVal) !== JSON.stringify(defaultValue) ) {
			resetFlag = false;
		}
		return <span className="customize-control-title">
				<>
					<div className="ast-color-btn-reset-wrap">
						<button
							className="ast-reset-btn components-button components-circular-option-picker__clear is-secondary is-small"
							disabled={resetFlag} onClick={e => {
							e.preventDefault();
							let value = JSON.parse(JSON.stringify(defaultValue));

							if (undefined === value || '' === value) {
								// Set empty value rather than unset so that elements can inherit the global or parents color property.
								value = '';
							}

							updateValues(value);
						}}>
						<Dashicon icon='image-rotate'/>
						</button>
					</div>
				</>
			</span>;
	};

	const handleChangeComplete = ( color ) => {
		let value;

		if (typeof color === 'string') {
			value = color;
		} else if (undefined !== color.rgb && undefined !== color.rgb.a && 1 !== color.rgb.a) {
			value = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
		} else {
			value = color.hex;
		}

		updateValues(value);
	};

	let labelHtml = null;
	let descriptionHtml = null;

	const {
		label,
		description
	} = props.control.params;

	if (label) {
		labelHtml = <span>{label}</span>;
	}

	if (description) {
		descriptionHtml = <><i className="ast-control-tooltip dashicons dashicons-editor-help" data-title={description}></i> <span className="ast-dashicons-custom-tooltip" data-title={description}><span></span></span></>;
	}

	return <div className="ast-control-wrap">
		<label>
			{labelHtml}
		</label>
		{descriptionHtml}
		<div className="ast-color-picker-alpha color-picker-hex">
			{renderOperationButtons()}
			<AstraColorPickerControl color={undefined !== state.value && state.value ? state.value : ''}
									 onChangeComplete={(color, backgroundType) => handleChangeComplete(color)}
									 backgroundType={'color'}
									 allowGradient={false}
									 allowImage={false}/>

		</div>
	</div>;

};

ColorComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default ColorComponent;
