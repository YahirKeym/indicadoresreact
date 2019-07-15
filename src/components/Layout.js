import React from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import SideBar from './SideBar.js';
function Layout(props)
{
    const Children = props.children;
    return (
        <div className="col-12 row p-0 m-0">
            <Navbar />
            <div className="d-none d-md-block col-md-12  mt-5 mb-5">
                <SideBar />
            </div>
            <div className="col-sm-12 col-md-12 mt-5 mb-5">
                {Children}
            </div>
            <Footer />
        </div>
    );
}
export default Layout;