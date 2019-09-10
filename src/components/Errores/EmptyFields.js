import React from 'react';
/**
 * El componente EmptyFields será un mensaje de alerta el cual nos dirá que hay 
 * campos vacios en los formularios donse se solicite.
 */
function EmptyFields(){
        return(
            <div className="col-12 d-flex justify-content-center">
                <div className="alert alert-danger">
                    <h5>
                        Hay campos vacios, por favor de verificar.
                    </h5>
                </div>
            </div>
        )
}
export default EmptyFields;