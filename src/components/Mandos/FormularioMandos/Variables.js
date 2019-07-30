import React from 'react';
import {Input} from '../../Formulario/ModulosFormulario';
import DeleteOneElement from '../../Generales/DeleOneElement';
// Se encargara de pintar las variables del indicador en modo formulario.
function Variables(props){
    const objeto = props.objeto,
    lugarDeDatos = props.lugarDeDatos;
    return(
        <div className="col-12 mt-3 row">
            <h4 className="col-12">Variables del indicador</h4>
            {lugarDeDatos.variables.map(variable=>
            {
                return (
                <div className="col-12 col-lg-4 mt-2" key={variable.id}>
                    <Input type="text" datos={{_self:objeto, lugar: lugarDeDatos.variables[variable.id-1], zona:"nombre"}} plhold={`variable ${variable.id}`} />
                </div>)
            })}
            <div className="col-12 col-lg-4 mt-2">
                <button onClick={objeto.handleAddVariable} type="button" className="btn btn-success">+</button>
                {lugarDeDatos.variables.length > 2 && (
                    <button onClick={e => {
                        DeleteOneElement(e,lugarDeDatos.variables,2,objeto);
                    }} type="button" className="btn btn-danger ml-2">-</button>
                )}
            </div>
        </div>
    )
}
export default Variables;