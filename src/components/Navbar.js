import React from 'react';
import {Link} from 'react-router-dom';
import imageLogo from '../images/suez-logo.png';
import CerrarSesion from './Generales/CerrarSesion.js';
class Navbar extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            menu:[
                {
                    'nombre':'Inicio',
                    'path':''
                }
            ]
        }
    }
    componentDidMount(){
        TraerDatos
    }
    render(){

        return (
            <header className="bg-header text-center p-3 col-12">
                <div className="row">
                    <Link to="/" className="col-lg-4 col-sm-12">
                        <figure>
                            <img src={imageLogo} alt="Suez indicadores"/>
                        </figure>
                    </Link>
                    {
                        this.state.menu.map(menu =>  <Link to={`/${menu.path}`} className="navbar-brand color-ancla-suez" >{menu.nombre}</Link>)
                    }
                    <ul className="col-lg-8 col-sm-12">
                        <Link to="/" className="navbar-brand color-ancla-suez" >Inicio</Link>
                        {this.props.state.logged &&(
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
}
export default Navbar;