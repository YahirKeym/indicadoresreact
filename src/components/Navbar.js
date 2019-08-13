import React from 'react';
import {Link} from 'react-router-dom';
import imageLogo from '../images/suez-logo.png';
import CerrarSesion from './Generales/CerrarSesion.js';
import TraeDatos from './TraeDatos';
class Navbar extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            menu:[

            ]
        }
    }
    // Traera el menú dependiendo del usuario
    componentDidMount(){
        TraeDatos({url:this.props.url,_self:this},"menu","menu");
    }
    // Limpiaremos en caso de que el componente falle
    componentWillUnmount(){
        clearTimeout(this.traeDatos);
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
                    <ul className="col-lg-8 col-sm-12">
                    {
                        this.state.menu.map((menu,id) =>  <Link to={`/${menu.path}`} key={id} className="navbar-brand color-ancla-suez" >{menu.nombre}</Link>)
                    }
                        {this.props.state.logged &&(
                            <CerrarSesion className="navbar-brand color-ancla-suez cursor-pointer" /> 
                        )}
                    </ul>
                </div>
            </header>
        );
    }
}
export default Navbar;