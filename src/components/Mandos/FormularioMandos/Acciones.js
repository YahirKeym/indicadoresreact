import React from 'react';
import {Input} from '../../Formulario/ModulosFormulario';
import DeleteOneElement from '../../Generales/DeleOneElement';
import AddOneElement from '../../Generales/AddOneElement';
/**
 * El componente de Acciones del formulario de mandos nos ayudara a crear y
 * a mostrar las acciones a tomar directamente en el formulario de creación
 * de indicadores
 * @param {properties} props Son las propiedades del componente
 * @param {object} objeto  Será el objeto del componente padre (this)
 * @param {array} lugarDeDatos Es el lugar donde los datos se encuentran de manerá
 * principal y que tiene como minimo una key de acciones.
 */
function Acciones(props){
    const oObjeto = props.objeto,
    aLugarDeDatos = props.lugarDeDatos;
    return(
        <div className="col-12 m-0">
            <h4>Acciones a tomar</h4>
            <div className="col-12 m-0 mt-3 p-0 row mb-3">
                <div className="col-4 m-0 p-0">
                    <button className=" btn btn-success" onClick={e => {
                        AddOneElement(e,oObjeto,aLugarDeDatos.acciones,"Acción",[
                            {"nombre":"asda","valor":"lala"}
                        ]);
                    }}>Agregar Acción +</button>
                </div>
                {aLugarDeDatos.acciones.length !== 0 && (
                    <div className="col-4 m-0 p-0">
                        <button className="btn btn-danger" onClick={e => DeleteOneElement(e,aLugarDeDatos.acciones,0,oObjeto)}>Eliminar Acción -</button>
                    </div>
                )}
            </div>
            {aLugarDeDatos.acciones.map(accion => {
                return(
                    <div key={accion.id} className="col-8 m-0 mt-2 p-0">
                        <Input type="text" datos={{_self:oObjeto,lugar:aLugarDeDatos.acciones[accion.id-1],zona:"nombre"}} defaultValue={accion.nombre} plhold={accion.nombre} />
                    </div>
                )
            })}
        </div>
    )
}
export default Acciones;