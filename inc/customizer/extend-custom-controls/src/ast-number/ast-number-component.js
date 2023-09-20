import PropTypes from 'prop-types';
import { useState } from 'react';

const AstNumberComponent = props => {
	const getValue = ( '' === props.control.setting.get() ) ? '' : props.control.setting.get();
	const [ numberState, setNumberState ] = useState( getValue );
	let htmlLabel = null;

	if ( props.control.params.label ) {
		htmlLabel = <span className="customize-control-title">{props.control.params.label}</span>;
	}

	const handleChange = event => {
		props.control.setting.set(event.target.value);
		setNumberState( event.target.value );
	};

	return <label className='customizer-text'>
		{ htmlLabel }
		<input
			type="number"
			value={ numberState }
			onChange={ handleChange }
		/>
	</label>;
};

AstNumberComponent.propTypes = {
	control: PropTypes.object.isRequired,
};

export default React.memo( AstNumberComponent );
