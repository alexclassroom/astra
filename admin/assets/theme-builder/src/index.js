import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

/**
 * Import the stylesheet for the plugin.
 */
import './style/main.css';

if ( document.getElementById('ast-tb-app-root') ) {
    ReactDOM.render(
        <App />,
        document.getElementById('ast-tb-app-root')
    );
}