import NumberComponent from './ast-number.js';

export const astNumberSelect = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render( <NumberComponent control={ control } />, control.container[0] );
	}
} );
