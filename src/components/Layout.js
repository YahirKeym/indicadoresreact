import React from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
function Layout(props)
{
    const Children = props.children;
    return (
        <React.Fragment>
            <Navbar />
            <div className="mt-5">
                {Children}
            </div>
            <Footer />
        </React.Fragment>
    );
}
export default Layout;