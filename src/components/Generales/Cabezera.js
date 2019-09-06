import React from 'react';
import {Helmet} from 'react-helmet';
function Cabezera(props){
    const cTitulo = props.cTitulo;
    return(
        <Helmet>
            <title>{cTitulo}</title>
        </Helmet>
    )
}
export default Cabezera;