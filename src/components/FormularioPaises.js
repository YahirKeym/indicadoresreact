import React from 'react';
import {Link} from 'react-router-dom';
function FormularioPaises(props)
{
    return (
        <form className="row m-0 p-3">
                <div className="col-12">
                    <input type="text" className="form-control" name="nombre" onChange={props.handleChange} placeholder="Nombre" defaultValue={props.state.edit.nombre}/>
                </div>
                <div className="col-12 mt-3">
                    <input type="text" className="form-control" name="prefijo" onChange={props.handleChange} placeholder="prefijo" defaultValue={props.state.edit.prefijo} />
                </div>
                <div className="col-12 mt-3">
                    <button className="btn btn-success" onClick={props.onAction}>{props.textAction}</button>
                    <Link to="/paises" className="btn btn-danger ml-3" onClick={props.handleBack}>Volver</Link>
                </div>
            </form>
    );
}
export default FormularioPaises;