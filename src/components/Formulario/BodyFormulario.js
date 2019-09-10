import React from 'react';
/**
 * El componente de BodyFormulario solo es una representación en la cuál se 
 * generalizara el color de todos los fomularios de la web.
 * @param {properties} props Son la propiedades que llevara el componente.
 * @param {string} children El hijo de los componentes es lo que va dentro de ellos.
 *      <SoyUnComponente>
 *          <p>
 *              Soy el hijo del componente y paso como "children" en las 
 *              propiedades
 *          </p>
 *      </SoyUnComponente> 
 */
function BodyFormulario(props){
    let children = props.children;
    return (
        <form className="row col-12 col-lg-9 mx-auto p-3 form-bg">
            {children}
        </form>
    )
}
export default BodyFormulario;