import MultiSelectComponent from './ast-select-multi.js';

export const multiSelectControl = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render( <MultiSelectComponent control={ control } />, control.container[0] );
	}
} );