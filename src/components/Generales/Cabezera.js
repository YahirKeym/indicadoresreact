import React from 'react';
import {Helmet} from 'react-helmet';
/**
 * El componente de Cabezera nos ayudara a incluir diferentes etiquetas de cabezera. 
 * Actualmente solo se acepta titulo.
 * @param {properties} props 
 * @param {string} cTitulo Será el titulo que se mostrará en la cabezera de la web.
 */
function Cabezera(props){
    const cTitulo = props.cTitulo;
    return(
        <Helmet>
            <title>{cTitulo}</title>
        </Helmet>
    )
}
export default Cabezera;