import React from 'react';
/**
 * En caso de que el usuario no cuente con datos, el componente
 * SinDatos será mandado a llamar dandole una alerta de que por el momento
 * el usuario no cuenta con dato que mostrar.
 */
function SinDatos()
{
    return (
        <div className="col-12 d-flex justify-content-center">
            <div className="col-12 col-md-6 alert alert-info">
                <h4 className="text-center">En este momento no hay datos, por favor intentalo más tarde</h4>
            </div>
        </div>
    );
}
export default SinDatos;