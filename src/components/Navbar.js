import React from 'react';
import {Link} from 'react-router-dom';
import imageLogo from '../images/suez-logo.png';
import CerrarSesion from './CerrarSesion.js';
function Navbar(props){
        return (
            <header className="bg-header text-center p-3 col-12">
                <div className="row">
                    <figure className="col-lg-4 col-sm-12">
                        <img src={imageLogo} alt=""/>
                    </figure>
                    <ul className="col-lg-8 col-sm-12">
                        <Link to="/" className="navbar-brand text-white" >Inicio</Link>
                        {props.state.logged &&(
                            <React.Fragment>
                                <Link to="/objetivos" className="navbar-brand text-white" >Objetivos</Link>
                                <Link to="/mandos" className="navbar-brand text-white" >Indicadores</Link>
                                <CerrarSesion className="navbar-brand text-white cursor-pointer" />  
                            </React.Fragment>
                        )}
                    </ul>
                </div>
            </header>
        );
}
export default Navbar;