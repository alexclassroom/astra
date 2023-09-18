import { __experimentalNumberControl as NumberControl } from '@wordpress/components';
import PropTypes from 'prop-types';
import { useState } from '@wordpress/element';


const NumberComponent = () => {
	const [ value, setValue ] = useState( 10 );

	return (
		<NumberControl
			isShiftStepEnabled={ true }
			onChange={ setValue }
			shiftStep={ 10 }
			value={ value }
		/>
	);
};

NumberComponent.propTypes = {
	control: PropTypes.object.isRequired,
};

export default React.memo(NumberComponent);
