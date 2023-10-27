import PropTypes from 'prop-types';
import {useState} from 'react';
import { Button } from '@wordpress/components';
import parse from 'html-react-parser';
import svgIcons from '../../../../../assets/svg/svgs.json';

const SelectorComponent = props => {

	const { input_attrs = null } = props.control.params;

	const [propsValue, setPropsValue] = useState(props.control.setting.get());

	const Icons = window.svgIcons;

	const onValueChange = ( value, device='' ) => {
		let updateState = {
			...propsValue
        };
        if ( '' !== device ) {
            updateState[device] = value;
        } else {
            updateState = value;
        }

		props.control.setting.set(updateState);
		setPropsValue(updateState);

		if ( null !== input_attrs && input_attrs.hasOwnProperty('dependents') && input_attrs.dependents ) {
			let subControlsToggleEvent = new CustomEvent('AstraToggleSubControls', {
				'detail': {
					'controlValue': updateState,
					'dependents': input_attrs.dependents
				}
			});
			document.dispatchEvent(subControlsToggleEvent);
		}
	};

	const renderInputHtml = ( device, active = '', resp = true ) => {

		const {
			choices,
			renderAs
		} = props.control.params;

		if ( ! choices ) {
			return;
		}

		if ( false === resp ) {

			let optionsHtml = Object.entries( choices ).map( ( [value, icon] ) => {

				if ( 'text' !== renderAs ) {

					var html = (
						<div className="ast-alignment-inner-wrap active" key={ value }>
							<Button
								key={ value }
								onClick={ () => onValueChange( value ) }
								aria-pressed = { value === propsValue }
								isPrimary = { value === propsValue }
							>
								<span className="ahfb-icon-set"
									dangerouslySetInnerHTML={ { __html: Icons[ icon ]  } }
								></span>
							</Button>
						</div>
					);
				} else {

					let counterChoice = icon.toString();

					var html = (
						<div className="ast-alignment-inner-wrap active" key={ value }>
							<Button
								key={ value }
								onClick={ () => onValueChange( value ) }
								aria-pressed = { value === propsValue }
								isPrimary = { value === propsValue }
								label = { icon }
							>
								{ counterChoice }
							</Button>
						</div>
					);
				}

				return html;
			} );

			return optionsHtml;
		}

		if ( 'text' !== renderAs ) {

			var optionsHtml = Object.entries( choices ).map( ( [value, icon] ) => {

				let html = (
					<div className={ `ast-alignment-inner-wrap ast-alignment-responsive ${device} ${active}` } key={ value } >
						<Button
							key={ value }
							onClick={ () => onValueChange( value, device ) }
							aria-pressed = { value === propsValue[device] }
							isPrimary = { value === propsValue[device] }
						>
							<span className="ahfb-icon-set"
								dangerouslySetInnerHTML={ { __html: Icons[ icon ]  } }
							></span>
						</Button>
					</div>
				);

				return html;
			} );
		} else {

			var optionsHtml = Object.entries( choices ).map( ( [value, icon] ) => {

				let counterChoice = icon.toString();

				let html = (
					<div className={ `ast-alignment-inner-wrap ast-alignment-responsive ${device} ${active}` } key={ value } >
						<Button
							key={ value }
							onClick={ () => onValueChange( value, device ) }
							aria-pressed = { value === propsValue[device] }
							isPrimary = { value === propsValue[device] }
							label = { icon }
						>
							{ counterChoice }

						</Button>
					</div>
				);

				return html;
			} );

		}

		return optionsHtml;
	};

	const {
		description,
		label,
		responsive
	} = props.control.params;
	let labelHtml = null;
	let responsiveHtml = null;
	let descriptionHtml = null;
	let inputHtml = null;

	let responsiveFlag = ( false === responsive ) ? false : true ;

	if (label) {
		labelHtml = <span className="customize-control-title">{label}</span>;

		if (responsiveFlag) {

			const responsiveDesktop = parse( svgIcons['desktop-responsive'] );
			const responsiveTablet = parse( svgIcons['tablet-responsive'] );
			const responsiveMobile = parse( svgIcons['mobile-responsive'] );

			responsiveHtml = <ul key={'ast-resp-ul'} className="ast-responsive-btns">
				<li key={'desktop'} className="desktop active">
					<button type="button" className="preview-desktop" data-device="desktop">
						{responsiveDesktop}
					</button>
				</li>
				<li key={'tablet'} className="tablet">
					<button type="button" className="preview-tablet" data-device="tablet">
						{responsiveTablet}
					</button>
				</li>
				<li key={'mobile'} className="mobile">
					<button type="button" className="preview-mobile" data-device="mobile">
						{responsiveMobile}
					</button>
				</li>
			</ul>;
		}
	}

	if (description) {
		descriptionHtml = <><i className="ast-control-tooltip dashicons dashicons-editor-help" data-title={description}></i> <span className="ast-dashicons-custom-tooltip" data-title={description}><span></span></span></>;
	}

	if (responsiveFlag) {
		inputHtml = <>
		<div className ="ast-selector-responsive-wrap desktop">
			{ renderInputHtml('desktop', 'active') }
		</div>
		<div className ="ast-selector-responsive-wrap tablet">
			{renderInputHtml('tablet')}
		</div>
		<div className ="ast-selector-responsive-wrap mobile">
			{renderInputHtml('mobile')}
		</div>
		</>;
	} else {
		inputHtml = <>
			{renderInputHtml('desktop', 'active', false)}
		</>;
	}

	return <div>
		<label key={'customizer-text'} className="customizer-text"></label>
		{labelHtml}
		{responsiveHtml}
		{descriptionHtml}
		<div className="input-wrapper ast-alignment-wrapper">
			{inputHtml}
		</div>
	</div>;

};

SelectorComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( SelectorComponent );
