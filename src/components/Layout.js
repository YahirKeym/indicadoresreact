import React from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import SideBar from './SideBar.js';
function Layout(props)
{
    const State = props.state
    const Children = props.children;
    return (
        <div className="col-12 row p-0 m-0">
            <Navbar state={State} />
            {State.logged && (
                    <SideBar state={State} />
            )}
            <div className="col-sm-12 col-md-12 mt-5 p-0">
                {Children}
            </div>
            <Footer />
        </div>
    );
}
export default Layout;