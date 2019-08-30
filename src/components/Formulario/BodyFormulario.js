import React from 'react';
// Será la estructura de cada formulario
function BodyFormulario(props){
    let children = props.children;
    return (
        <form className="row col-12 col-lg-9 mx-auto p-3 form-bg text-white">
            {children}
        </form>
    )
}
export default BodyFormulario;