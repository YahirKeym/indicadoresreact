import React from 'react';
import {Input} from '../../Formulario/ModulosFormulario';
import DeleteOneElement from '../../Generales/DeleOneElement';
import AddOneElement from '../../Generales/AddOneElement';
function Acciones(props){
    const objeto = props.objeto,
    lugarDeDatos = props.lugarDeDatos;
    return(
        <div className="col-12 m-0">
            <h4>Acciones a tomar</h4>
            <div className="col-12 m-0 mt-3 p-0 row mb-3">
                <div className="col-4 m-0 p-0">
                    <button className=" btn btn-success" onClick={e => {
                        AddOneElement(e,objeto,lugarDeDatos.acciones,"Acción",[
                            {"nombre":"asda","valor":"lala"}
                        ]);
                    }}>Agregar Acción +</button>
                </div>
                {lugarDeDatos.acciones.length !== 0 && (
                    <div className="col-4 m-0 p-0">
                        <button className="btn btn-danger" onClick={e => DeleteOneElement(e,lugarDeDatos.acciones,0,objeto)}>Eliminar Acción -</button>
                    </div>
                )}
            </div>
            {lugarDeDatos.acciones.map(accion => {
                return(
                    <div key={accion.id} className="col-8 m-0 mt-2 p-0">
                        <Input type="text" datos={{_self:objeto,lugar:lugarDeDatos.acciones[accion.id-1],zona:"nombre"}} defaultValue={accion.nombre} plhold={accion.nombre} />
                    </div>
                )
            })}
        </div>
    )
}
export default Acciones;