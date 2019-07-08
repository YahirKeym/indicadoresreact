import React from 'react';
import {Link} from 'react-router-dom';
function SideBar()
{
    return (
        <div className="col-8 ">
            <ul>
                <div>
                    <Link className="navbar-brand" to="/tipos/alcance">Tipos de Alcance</Link>
                </div>
                <div>
                    <Link className="navbar-brand" to="/paises">Paises</Link>
                </div>
                <div>
                    <Link className="navbar-brand" to="/jerarquia">Jerarquia</Link>
                </div>
            </ul>
        </div>
    );
}
export default SideBar;