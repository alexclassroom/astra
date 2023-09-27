import PropTypes from 'prop-types';
import {__} from '@wordpress/i18n';
import {useState} from 'react';
import Select from 'react-select';

const MultiSelectComponent = props => {

	const {
		help,
		label,
		name,
        choices,
	} = props.control.params;

	const [ propValue, setPropValue ] = useState( props.control.setting.get() || [] );
	const [ taxVal, setTaxVal ] = useState( choices || [] );

	const verticalScroll = () => {
		const scrollContainer = document.querySelectorAll(".ast-multi-select__value-container");

		scrollContainer.forEach(element => {
			if( element ) {
				element.addEventListener("wheel", (evt) => {
					evt.preventDefault();
					element.scrollLeft += evt.deltaY;
				});
			}
		});
	}

	let labelHtml = label ? <span>{label}</span> : '',
		helpHtml = help ? <span className="description customize-control-variant-description">{help}</span> : null;

	const prepareToSave = ( single ) => {
		let value = Object.entries( single ).map( ( [ key, name ] ) => {
			if( 'string' == typeof name ) {
				return name;
			} else {
				return name.value;
			}
		} );
		let unique = [...new Set(value)];
		let joinValue = unique.join(",");
		setPropValue(joinValue);
		props.control.setting.set(joinValue);
	};

	const updateValues = (newVal) => {

		if( ! newVal.length ) {
			setPropValue([]);
			props.control.setting.set([]);
			return;
		}
		prepareToSave( newVal );
	};

	const options = Object.entries( taxVal ).map( ( [ key, single ] ) => {
		return ( { label: single.name, value: key } );
	} );

	const variantValue = 'string' === typeof propValue ? propValue.split(',') : propValue;
	let selectedValues = null;
	if( variantValue && variantValue.length ) {
		selectedValues = Object.entries( variantValue ).map( ( [ key, name ] ) => {
			return ( { label: taxVal[name].name, value: name } );
		} );
	}

	return <>
		{
			labelHtml !== '' && (
				<label className="customize-control-title">
					{labelHtml}
				</label>
			)
		}

		<div className='ast-customizer-select-multi'>
			<Select
				name = { name }
				value = { selectedValues }
				options = { options }
				isMulti = { true }
				onChange = { ( value ) => updateValues( value )}
				onFocus = { () => verticalScroll() }
				className = "ast-variant-select"
				classNamePrefix="ast-multi-select"
				components={{
					DropdownIndicator: () => null,
					IndicatorSeparator: () => null,
					ClearIndicator: () => null
				}}
			/>
			{helpHtml}
		</div>
	</>;
};

MultiSelectComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( MultiSelectComponent );
