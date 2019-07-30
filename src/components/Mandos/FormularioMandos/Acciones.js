import React from 'react';
import {Input} from '../../Formulario/ModulosFormulario';
import DeleteOneElement from '../../Generales/DeleOneElement';
function Acciones(props){
    const objeto = props.objeto,
    lugarDeDatos = props.lugarDeDatos;
    return(
        <React.Fragment>
            {lugarDeDatos.acciones.map(accion => {
                return(
                    <div key={accion.id} className="col-8 mt-2">
                        <Input type="text" datos={{_self:objeto,lugar:lugarDeDatos.acciones[accion.id-1],zona:"nombre"}} defaultValue={accion.nombre} plhold={accion.nombre} />
                    </div>
                )
            })}
            <div className="col-12 mt-3">
                <div className="col-6 m-0 p-0">
                    <button className=" btn btn-success" onClick={objeto.handleAddAction}>Agregar Acción +</button>
                </div>
                {lugarDeDatos.acciones.length !== 0 && (
                    <div className="col-6 m-0 p-0">
                        <button className="btn btn-danger mt-3" onClick={e => DeleteOneElement(e,lugarDeDatos.acciones,0,objeto)}>Eliminar Acción -</button>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}
export default Acciones;