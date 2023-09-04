import AstNumberComponent from './ast-number-component';

export const numberInputControl = wp.customize.Control.extend( {
	renderContent: function renderContent() {
		const control = this;
		ReactDOM.render( <AstNumberComponent control={ control } />, control.container[0] );
	}
} );
