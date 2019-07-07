import React from 'react';
import {Link} from 'react-router-dom';
import imageLogo from '../images/suez-logo.png';
class Navbar extends React.Component
{
    render() 
    {
        return (
            <header className="bg-secondary text-center p-3">
                <div className="row">
                    <figure className="col-lg-4 col-sm-12">
                        <img src={imageLogo}/>
                    </figure>
                    <ul className="col-lg-8 col-sm-12">
                        <Link to="/" className="navbar-brand text-white" >Inicio</Link>
                        <Link to="/objetivos" className="navbar-brand text-white" >Objetivos</Link>
                        <Link to="/mando" className="navbar-brand text-white" >Mando</Link>
                    </ul>
                </div>
            </header>
        );
    }
}
export default Navbar;