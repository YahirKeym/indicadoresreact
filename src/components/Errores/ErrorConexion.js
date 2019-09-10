import React from 'react';
import Loader from '../Generales/Loader';
/**
 * El componente ErrorConexion será un mensaje de alerta el cual nos dirá que hay 
 * un error con la conexión del usuario, si este fue desconectado de la red o no se logra 
 * una conexión concreta con la api de la app.
 */
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