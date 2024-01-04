import PropTypes from 'prop-types';

import {Fragment} from '@wordpress/element';

const DividerComponent = props => {

	const {
		caption,
		separator,
		label,
		description,
		suffix,
	} = props.control.params;

	let separatorHtml = null;
	let captionHtml = null;
	let labelHtml = null;
	let descriptionHtml = null;
	let suffixHtml = null;

	if (false !== separator) {
		separatorHtml = <hr/>;
	}

	if (caption) {
		captionHtml = <span className="customize-control-caption">{caption}</span>;
	}

	if (label) {
		labelHtml = <span className="customize-control-title">{label}</span>;
		separatorHtml = null
	}

	if (description) {
		descriptionHtml = <span className="description customize-control-description">{description}</span>;
	}

	if(suffix) {
		suffixHtml = <span className="suffix customize-control-suffix">{suffix}</span>
	}

	return <Fragment>
		{captionHtml}
		{separatorHtml}
		<label className="customizer-text">
			{labelHtml}
			{suffixHtml}
			{descriptionHtml}
		</label>
	</Fragment>;
};

DividerComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( DividerComponent );
