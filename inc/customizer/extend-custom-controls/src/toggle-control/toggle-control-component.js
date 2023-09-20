import PropTypes from 'prop-types';
import {Fragment} from '@wordpress/element';
import {useState} from 'react';
import ToggleControl from '../ast-toggle/toggle-control';

const AstToggleControl = props => {

  let htmlTitle = null;
  let htmlDescription = null;

  const [props_value, setPropsValue] = useState(props.control.setting.get());

  if (props.control.params.title) {
    htmlTitle = <span className="toggle-control-label">{props.control.params.title}</span>;
  }
	if (props.control.params.description) {
		htmlDescription = <><i className="ast-control-tooltip dashicons dashicons-editor-help" data-title={props.control.params.description}></i> <span className="ast-dashicons-custom-tooltip" data-title={props.control.params.description}><span></span></span></>;
	}

  const updateValues = () => {
		setPropsValue( ! props_value );
		props.control.setting.set( ! props_value );
	};

  return <Fragment>
				<div className={`ast-togglecontrol-wrapper ${ props.control.params.description ? 'ast-description-enabled' : '' }`}>
            <ToggleControl
            label={htmlTitle}
            checked={props_value}
            onChange={() => updateValues()}
            />
          {htmlDescription}
        </div>
			</Fragment>;
};

AstToggleControl.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( AstToggleControl );
