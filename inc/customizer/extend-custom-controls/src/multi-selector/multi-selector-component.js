import PropTypes from 'prop-types';
import {useState} from 'react';

const MultiSelectorComponent = props => {

	const [propsValue, setPropsValue] = useState(props.control.setting.get());

	const Icons = window.svgIcons;

	const onValueChange = ( value ) => {
		let updateState = {
			...propsValue
		};

		updateState[ value ] = updateState[ value ] ? 0 : 1;

		props.control.setting.set(updateState);
		setPropsValue(updateState);
	};

	const renderInputHtml = () => {

		const {
			choices,
			renderAs
		} = props.control.params;

		if ( ! choices ) {
			return;
		}

		let optionsHtml = Object.entries( choices ).map( ( [value, icon] ) => {

			if ( 'text' !== renderAs ) {
				var html = (
					<div
						className={"ast-multiselector-inner-wrap " + (propsValue[value] ? "active" : "")}
						key={ value }
						onClick={ () => onValueChange( value ) }
					>
						<span className="ahfb-icon-set" key={ value }
							dangerouslySetInnerHTML={ { __html: Icons[ icon ]  } }
						></span>
					</div>
				);
			} else {
				var html = (
					<div
						className={"ast-multiselector-inner-wrap " + (propsValue[value] ? "active" : "")}
						key={ value }
						onClick={ () => onValueChange( value ) }
					>
						<span
							key={ value }
							label = { icon }
						>
							{ icon }
						</span>
					</div>
				);
			}

			return html;
		} );

		return optionsHtml;
	};

	const {
		description,
		label,
		input_attrs
	} = props.control.params;
	let labelHtml = null;
	let responsiveHtml = null;
	let descriptionHtml = null;
	let inputHtml = null;
	let stackAfterClass = '';

	if (label) {
		labelHtml = <span className="customize-control-title">{label}</span>;
	}

	if (description) {
		descriptionHtml = <span className="description customize-control-description">{description}</span>;
	}

	if (input_attrs) {
		stackAfterClass = input_attrs.stack_after ? 'stack-after-' + input_attrs.stack_after : '';
	}

	inputHtml = <>
		{renderInputHtml()}
	</>;

	return <div>
		<label key={'customizer-text'} className="customizer-text"></label>
		{labelHtml}
		{responsiveHtml}
		{descriptionHtml}
		<div className={`input-wrapper ast-alignment-wrapper ${stackAfterClass}`}>
			{inputHtml}
		</div>
	</div>;

};

MultiSelectorComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( MultiSelectorComponent );
