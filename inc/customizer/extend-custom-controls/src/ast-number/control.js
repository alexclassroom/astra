import NumberComponent from './ast-number.js';
import {astraGetResponsiveNumberJs} from '../common/responsive-helper';

export const astNumberControl = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render( <NumberComponent control={ control } />, control.container[0] );
	},
	ready: function() {
		astraGetResponsiveNumberJs( this );
	}
} );
