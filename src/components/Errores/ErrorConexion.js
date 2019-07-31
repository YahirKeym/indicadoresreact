import React from 'react';
import Loader from '../Generales/Loader';
// Se encargara del mensaje de desconexión, mostrando un loader para que parezca que la web está haciendo algo
function ErrorConexion(){
    return(
        <div className="col-12 d-flex justify-content-center">
            <div className="col-6 text-center alert alert-danger">
                <p>Te haz desconectado</p>
                <h5>Estamos intentando reconectar, por favor espera.</h5>
                <Loader />
            </div>
        </div>
    )
}
export default ErrorConexion;