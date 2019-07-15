import React from 'react';
import {Link} from 'react-router-dom';
function SideBar()
{
    return (
        <div className="col-12 d-flex justify-content-center row text-center">
                <div className="col-2">
                    <Link className="navbar-brand" to="/tipos/alcance">Tipos de Alcance</Link>
                </div>
                <div className="col-2">
                    <Link className="navbar-brand" to="/paises">Paises</Link>
                </div>
                <div className="col-2">
                    <Link className="navbar-brand" to="/jerarquia">Jerarquia</Link>
                </div>
        </div>
    );
}
export default SideBar;