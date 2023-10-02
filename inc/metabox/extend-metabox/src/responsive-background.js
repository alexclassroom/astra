import PropTypes from 'prop-types';
import {Dashicon} from '@wordpress/components';
import AstraColorPickerControl from './astra-color-picker-control';
import {__} from '@wordpress/i18n';
import {useEffect, useState} from 'react';
import parse from 'html-react-parser';
import svgIcons from '../../../../assets/svg/svgs.json';


const ResponsiveBackground = props => {

	const {
		metavalue
	} = props;

	let defaultPropsValue = props.control.default;

	const [state, setState] = useState({
			value: metavalue,
		}
	);

	const updateValues = (obj) => {
		setState(prevState => ({
			...prevState,
			value: obj
		}));
		props.control.setMetaFieldValue( obj, props.control.controlName )
	};

	const updateBackgroundType = (device) => {
		let value = props.metavalue;
		let obj = {
			...value
		};

		if ( ! state.value[device]['background-type']) {
			let deviceObj = {
				...obj[device]
			};

			if (state.value[device]['background-color']) {
				deviceObj['background-type'] = 'color';
				obj[device] = deviceObj;
				updateValues(obj);

				if (state.value[device]['background-color'].includes('gradient')) {
					deviceObj['background-type'] = 'gradient';
					obj[device] = deviceObj;
					updateValues(obj);
				}
			}

			if (state.value[device]['background-image']) {
				deviceObj['background-type'] = 'image';
				obj[device] = deviceObj;
				updateValues(obj);
			}
		}
	};

	const renderReset = () => {
		let reserBtnDisabled = true;
		let devices = ['desktop', 'mobile', 'tablet'];

		for (let device of devices) {

			if (state.value[device]['background-color'] !== defaultPropsValue[device]['background-image'] || state.value[device]['background-image'] !== defaultPropsValue[device]['background-color'] || state.value[device]['background-media'] !== defaultPropsValue[device]['background-media']) {
				reserBtnDisabled = false;
			}
		}

		return <div className="ast-color-btn-reset-wrap">
						<button
							className="ast-reset-btn components-button components-circular-option-picker__clear is-secondary is-small"
							disabled={reserBtnDisabled} onClick={e => {
							e.preventDefault();
							let value = JSON.parse(JSON.stringify(defaultPropsValue));

							if (undefined !== value && '' !== value) {
								for (let device in value) {
									if (undefined === value[device]['background-color'] || '' === value[device]['background-color']) {
										value[device]['background-color'] = '';
									}

									if (undefined === value[device]['background-image'] || '' === value[device]['background-image']) {
										value[device]['background-image'] = '';
									}

									if (undefined === value[device]['background-media'] || '' === value[device]['background-media']) {
										value[device]['background-media'] = '';
									}
								}
							}

							updateValues(value);

						}}>
							<Dashicon icon='image-rotate'/>
						</button>
					</div>;
	};

	const onSelectImage = (media, key, backgroundType) => {
		let obj = {
			...state.value
		};
		let deviceObj = {
			...obj[key]
		};
		deviceObj['background-image'] = media.url;
		deviceObj['background-media'] = toString(media.id);
		deviceObj['background-type'] = backgroundType;
		obj[key] = deviceObj;
		updateValues(obj);
	};

	const onChangeImageOptions = (mainKey, value, device, backgroundType) => {
		let obj = {
			...state.value
		};
		let deviceObj = {
			...obj[device]
		};
		deviceObj[mainKey] = value;
		deviceObj['background-type'] = backgroundType;
		obj[device] = deviceObj;
		updateValues(obj);
	};

	useEffect(() => {

		let devices = ['desktop', 'mobile', 'tablet'];
		for (let device of devices) {
			updateBackgroundType(device);
		}

	}, []);

	const renderSettings = (key) => {

		return <>
			<AstraColorPickerControl
				color={undefined !== state.value[key]['background-color'] && state.value[key]['background-color'] ? state.value[key]['background-color'] : ''}
				onChangeComplete={(color, backgroundType) => handleChangeComplete(color, key, backgroundType)}
				media={undefined !== state.value[key]['background-media'] && state.value[key]['background-media'] ? state.value[key]['background-media'] : ''}
				backgroundImage={undefined !== state.value[key]['background-image'] && state.value[key]['background-image'] ? state.value[key]['background-image'] : ''}
				backgroundAttachment={undefined !== state.value[key]['background-attachment'] && state.value[key]['background-attachment'] ? state.value[key]['background-attachment'] : ''}
				backgroundPosition={undefined !== state.value[key]['background-position'] && state.value[key]['background-position'] ? state.value[key]['background-position'] : ''}
				backgroundRepeat={undefined !== state.value[key]['background-repeat'] && state.value[key]['background-repeat'] ? state.value[key]['background-repeat'] : ''}
				backgroundSize={undefined !== state.value[key]['background-size'] && state.value[key]['background-size'] ? state.value[key]['background-size'] : ''}
				onSelectImage={(media, backgroundType) => onSelectImage(media, key, backgroundType)}
				onChangeImageOptions={(mainKey, value, backgroundType) => onChangeImageOptions(mainKey, value, key, backgroundType)}
				backgroundType={undefined !== state.value[key]['background-type'] && state.value[key]['background-type'] ? state.value[key]['background-type'] : 'color'}
				overlayType={undefined !== state.value[key]['overlay-type'] && state.value[key]['overlay-type'] ? state.value[key]['overlay-type'] : 'none'}
				overlayColor={undefined !== state.value[key]['overlay-color'] && state.value[key]['overlay-color'] ? state.value[key]['overlay-color'] : ''}
				overlayGradient={undefined !== state.value[key]['overlay-gradient'] && state.value[key]['overlay-gradient'] ? state.value[key]['overlay-gradient'] : ''}
				allowGradient={true} allowImage={true}/>
		</>;
	};

	const handleChangeComplete = (color, key, backgroundType) => {
		let value = '';

		if (color) {
			if (typeof color === 'string' || color instanceof String) {
				value = color;
			} else if (undefined !== color.rgb && undefined !== color.rgb.a && 1 !== color.rgb.a) {
				value = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
			} else {
				value = color.hex;
			}
		}

		let obj = {
			...state.value
		};
		let deviceObj = {
			...obj[key]
		};
		deviceObj['background-color'] = value;
		deviceObj['background-type'] = backgroundType;
		obj[key] = deviceObj;
		updateValues(obj);
	};

	const {
		label,
		description
	} = props.control;

	let labelHtml = null;
	let descriptionHtml = null;
	let responsiveHtml = null;
	let inputHtml = null;

	const responsiveDesktop = parse( svgIcons['desktop-responsive'] );
	const responsiveTablet = parse( svgIcons['tablet-responsive'] );
	const responsiveMobile = parse( svgIcons['mobile-responsive'] );

	if (label && '' !== label && undefined !== label) {
		labelHtml = <span>{label}</span>;
	} else {
		labelHtml = <span>{__('Background', 'astra')}</span>;
	}

	if (description) {
		descriptionHtml = <span className="description customize-control-description">{description}</span>;
	}
	const skipResponsiveTriggers = ( undefined !== props.control.ignore_responsive_btns && props.control.ignore_responsive_btns ) ? true : false;

	const [activeDevice, setActiveDevice] = useState('desktop'); // Initialize with 'desktop' as active device

	const handleDeviceChange = ( device ) => {
		if ( 'desktop' === device ) {
			setActiveDevice( 'tablet' );
		}
		else if ( 'tablet' === device ) {
			setActiveDevice( 'mobile' );
		}
		else {
			setActiveDevice( 'desktop' );
		}
	}

	responsiveHtml = <ul className="ast-responsive-btns">
		<li className={`desktop ${activeDevice === 'desktop' ? 'active' : ''}`} onClick={ () => handleDeviceChange('desktop') }>
			<button type="button" className="preview-desktop" data-device="desktop">
				{responsiveDesktop}
			</button>
		</li>
		<li className={`tablet ${activeDevice === 'tablet' ? 'active' : ''}`} onClick={ () => handleDeviceChange('tablet') }>
			<button type="button" className="preview-tablet" data-device="tablet">
				{responsiveTablet}
			</button>
		</li>
		<li className={`mobile ${activeDevice === 'mobile' ? 'active' : ''}`} onClick={ () => handleDeviceChange('mobile') }>
			<button type="button" className="preview-mobile" data-device="mobile">
				{responsiveMobile}
			</button>
		</li>
	</ul>;

	inputHtml = <div className="background-wrapper">
		<div className={`background-container desktop ${activeDevice === 'desktop' ? 'active' : ''}`}>
			{renderSettings('desktop')}
		</div>
		<div className={`background-container tablet ${activeDevice === 'tablet' ? 'active' : ''}`}>
			{renderSettings('tablet')}
		</div>
		<div className={`background-container mobile ${activeDevice === 'mobile' ? 'active' : ''}`}>
			{renderSettings('mobile')}
		</div>
	</div>;

	return <>
		<div className='ast-bg-control-left'>
			<label>
				{labelHtml}
				{descriptionHtml}
			</label>
			{ ( ! skipResponsiveTriggers ) &&
				responsiveHtml
			}
		</div>
		<div className='ast-bg-control-right'>
			{renderReset()}
			<div className="customize-control-content">
				{inputHtml}
			</div>
		</div>
	</>;
};

ResponsiveBackground.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( ResponsiveBackground );
