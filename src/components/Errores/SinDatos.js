import React from 'react';
// Se encargara de mostrar el mensaje que nos dira si una web se encuentra sin datos.
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