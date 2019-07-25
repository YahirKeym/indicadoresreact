import React from 'react';
import {Link} from 'react-router-dom';
import imageLogo from '../images/suez-logo.png';
import CerrarSesion from './CerrarSesion.js';
function Navbar(props){
        return (
            <header className="bg-header text-center p-3 col-12">
                <div className="row">
                    <Link to="/" className="col-lg-4 col-sm-12">
                        <figure>
                            <img src={imageLogo} alt="Suez indicadores"/>
                        </figure>
                    </Link>
                    <ul className="col-lg-8 col-sm-12">
                        <Link to="/" className="navbar-brand color-ancla-suez" >Inicio</Link>
                        {props.state.logged &&(
                            <React.Fragment>
                                <Link to="/objetivos" className="navbar-brand color-ancla-suez" >Objetivos</Link>
                                <Link to="/mandos" className="navbar-brand color-ancla-suez" >Indicadores</Link>
                                <CerrarSesion className="navbar-brand color-ancla-suez cursor-pointer" />  
                            </React.Fragment>
                        )}
                    </ul>
                </div>
            </header>
        );
}
export default Navbar;