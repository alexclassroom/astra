import PropTypes from 'prop-types';
import {Fragment} from '@wordpress/element';
import {useState} from 'react';
import { __ } from "@wordpress/i18n";

const RadioImageComponent = props => {

	const [props_value, setPropsValue] = useState(props.control.setting.get());
	const { input_attrs = null } = props.control.params;

	const onLayoutChange = (value) => {
		setPropsValue(value);
		props.control.setting.set(value);

		if ( null !== input_attrs && input_attrs.hasOwnProperty('dependents') && input_attrs.dependents ) {
			let subControlsToggleEvent = new CustomEvent('AstraToggleSubControls', {
				'detail': {
					'controlValue': value,
					'dependents': input_attrs.dependents
				}
			});
			document.dispatchEvent(subControlsToggleEvent);
		}
	};

	const {
		label,
		description,
		id,
		alt_layout,
		choices,
		inputAttrs,
		choices_titles,
		choices_upgrade,
		link,
		labelStyle
	} = props.control.params;

	let htmlLabel = null,
		htmlDescription = null,
		htmlRadio,
		inp_array = [];

	// Adds class to enable four column layout.
	const altLayout =  alt_layout ? 'ast-divide-four' : 'modern-layout';

	if (label) {
		htmlLabel = <span className="customize-control-title">{label}</span>;
	}

	if (description) {
		htmlDescription = <span className="description customize-control-description">{description}</span>;
	}

	if( inputAttrs ) {
		let splited_values = inputAttrs.split(" ");
		splited_values.map((item, i) => {
			let item_values = item.split("=");
			if (undefined !== item_values[1]) {
				inp_array[item_values[0]] = item_values[1].replace(/"/g, "");
			}
		});
	}

	if( link ) {
		let splited_values = link.split(" ");
		splited_values.map((item, i) => {
			let item_values = item.split("=");
			if (undefined !== item_values[1]) {
				inp_array[item_values[0]] = item_values[1].replace(/"/g, "");
			}
		});
	}

	htmlRadio = Object.entries(choices).map(([key, value]) => {
		let checked = props_value === key ? true : false;
		if( choices_upgrade[key] ) {
			return <a href={window.AstraBuilderCustomizerData.upgradeUrl} target='_blank' key={key} className='ast-upgrade-trigger'>
				<label className={`ast-radio-img-svg ${ ( choices_upgrade[key] ) ? 'ast-pro-option' : '' }`}>
					<span dangerouslySetInnerHTML={{
						__html: choices[key]
					}}/>
					<span className="image-clickable" data-title={( choices_upgrade[key] ) ? __( 'Upgrade to unlock', 'astra' ) : choices_titles[key]}></span>
				</label>
			</a>;
		} else {
			return <Fragment key={key}>
				<input {...inp_array} className="image-select" type="radio" value={key} name={`_customize-radio-${id}`}
					id={id + key} checked={checked} onChange={() => onLayoutChange(key)}/>

				<label htmlFor={id + key} {...labelStyle} className={`ast-radio-img-svg ${ ( choices_upgrade[key] ) ? 'ast-pro-option' : '' }`}>
							<span dangerouslySetInnerHTML={{
								__html: choices[key]
							}}/>
					<span className="image-clickable" data-title={( choices_upgrade[key] ) ? __( 'Upgrade to unlock', 'astra' ) : choices_titles[key]}></span>
				</label>
			</Fragment>;
		}
	});
	return <Fragment>
		<label className="customizer-text">
			{htmlLabel}
			{htmlDescription}
		</label>
		<div id={`input_${id}`} className={`image ${ altLayout }`}>
			{htmlRadio}
		</div>
	</Fragment>;
};

RadioImageComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( RadioImageComponent );
