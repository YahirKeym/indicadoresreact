import React from 'react';
import {Link} from 'react-router-dom';
import './styles/SideBar.css';
function SideBar()
{
    return (
        <div className="col-12 side-bar-bg p-3 d-flex justify-content-center row text-center m-0">
                
                {/* <div className="col-12 col-md-3">
                    <Link className="navbar-brand text-white" to="/tipos/alcance">Tipos de Alcance</Link>
                </div>
                <div className="col-12 col-md-3">
                    <Link className="navbar-brand text-white" to="/paises">Paises</Link>
                </div> */}
                {/* <div className="col-12 col-md-3">
                    <Link className="navbar-brand" to="/jerarquia">Jerarquia</Link>
                </div> */}
        </div>
    );
}
export default SideBar;