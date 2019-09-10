import React from 'react';
import {Link} from 'react-router-dom';
/**
 * El componente de ButtonDirectTop nos ayudara a generar un botton con cierto diseño
 * estandarizado que nos llevara a x lado de la web que le indiquemos
 * @param {properties} props
 * @param {string} to Será la dirección a donde se dirigiera el botón
 * @param {string} text Será el texto que se mostrará del botón. 
 */
function ButtonDirectTop(props){
    return(
        <div className="col-12 row d-flex justify-content-center mb-3">
            <Link to={props.to} className="col-4 btn btn-success-suez">{props.text}</Link>
        </div>
    )
}

export default ButtonDirectTop;