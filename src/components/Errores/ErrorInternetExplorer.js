import React from 'react';
/**
 * El componente ErrorInterExplorer se desplegara cuando un usuario se encuentra
 * usando un navegador de internetExplorer 11 
 */
function ErrorInternetExplorer(){
    return(
        <div className="col-12 d-flex justify-content-center">
            <div className="alert alert-danger col-6">
                <h5 className="text-center">
                    Estás usando internet explorer, por favor asegurate de usar otro tipo de navegador para
                    un buen funcionamiento y tener todas las funciones de la web activas.
                </h5>
            </div>
        </div>
    )
}
export default ErrorInternetExplorer;