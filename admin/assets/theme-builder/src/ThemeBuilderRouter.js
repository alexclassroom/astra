import React from 'react';
import { useLocation } from 'react-router-dom';
import Categories from './components/Categories';

function ThemeBuilderRouter({ categoriesProps, categoryData }) {
	const query = new URLSearchParams( useLocation().search );
	const page = query.get( 'page' );
	let routePage = <p> Fallback Route Page </p>;
	if ( 'theme-builder' === page ) {
        routePage = <Categories items={categoriesProps} />;
	}
	return <>{ routePage }</>;
}

export default ThemeBuilderRouter;
