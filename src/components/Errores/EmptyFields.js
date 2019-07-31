import React from 'react';
// Será el aviso de que hay campos vacios
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