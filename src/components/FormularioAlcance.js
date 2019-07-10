import React from 'react';
function FormularioAlcance(props)
{
    return(
        <form className="row col-md-8 col-sm-12 mx-auto">
            {
                props.state.empty && (
                    <div className="bg-danger text-white mb-3 text-center col-12 field-empty p-2">
                        <h5>Un campo está vacio</h5>
                    </div>
                )
            }
            {
                props.state.repetido && (
                    <div className="bg-danger text-white mb-3 text-center col-12 field-empty p-2">
                        <h5>El nombre interno ya está en uso</h5>
                        <p>{props.state.nombre} Lo está usando</p>
                    </div>
                )
            }
            <div className="col-12">
                {props.state.empty && (
                <input type="text" name="nombre" className="form-control field-empty" placeholder="Nombre del alcance" onChange={props.onChange}/>
                )}
                {!props.state.empty && (
                <input type="text" name="nombre" className="form-control" placeholder="Nombre del alcance" onChange={props.onChange}/>
                )}
            </div>
            <div className="col-12 mt-3">
                {props.state.empty && (
                    <input type="text" name="nombreinterno" className="form-control field-empty" placeholder="Nombre Interno y unico que llevara el alcance"  onChange={props.onChange}/>
                )}
                {!props.state.empty && (
                    <input type="text" name="nombreinterno" className="form-control" placeholder="Nombre Interno y unico que llevara el alcance"  onChange={props.onChange}/>
                )}
            </div>
            <div className="col-12 mt-3">
                <button className="btn btn-success" onClick={props.onClick}>{props.textAction}</button>
                <button className="btn btn-danger ml-3" onClick={props.handleBack}>Volver</button>                    
            </div>
        </form>
    );
}
export default FormularioAlcance;