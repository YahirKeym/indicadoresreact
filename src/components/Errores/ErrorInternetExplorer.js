// Se importa react para poder usar la funcionalidad de JSX la cual es usar html dentro de
// javascript.
import React from 'react';
// Está función guardara la interfaz del error que se mostrara si el usuario se encuentra
// usando internet explorer 11
function ErrorInternetExplorer(){
    // Regresamos el html que cumple con el diseño que le dimos de un alert de peligro.
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
// Exportamos la función de ErrorInternetExplorer para así cuando la mandemos a llamar
// solo tengamos que colocar y el error se muestre automaticamente.
export default ErrorInternetExplorer;