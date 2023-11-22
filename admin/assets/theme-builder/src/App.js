import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import sidebarItems from './utils/sidebarItems';
import Canvas from './components/Canvas';
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
    // Remove admin bar padding.
    useEffect(() => { document.querySelector('html.wp-toolbar').style.paddingTop = 0; }, []);

    return (
        <Router>
            <div className='ast-tb-app'>
                <Header/>
                <div className='ast-tb-main'>
                    <Sidebar items={sidebarItems}/>
                    <Canvas />
                </div>
            </div>
        </Router>
    );
}

export default App;