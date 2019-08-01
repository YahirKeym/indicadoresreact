import React from 'react';
import AddOneElement from "./AddOneElement";
import DeleteOneElement from "./DeleOneElement";

function BottonAddandDelete(props){
    const objeto = props.objeto,
    lugarDeDatos = props.lugarDeDatos,
    cantidadMinima = parseInt(props.minimo),
    datosExtra = props.extra,
    {nombre, nombreAgregar, nombreEliminar} = props.datos,
    className=props.className;
    return(
        <div className="col-12 m-0 mt-3 p-0 row mb-3">
            <div className={`col-4 m-0 ${className}`}>
                <button className=" btn btn-success" onClick={e => {
                    AddOneElement(e,objeto,lugarDeDatos,nombre,datosExtra);
                }}>
                    {nombreAgregar}
                </button>
            </div>
            {lugarDeDatos.length !== cantidadMinima && (
                <div className="col-4 m-0 p-0">
                    <button className="btn btn-danger" 
                    onClick={e => DeleteOneElement(e,lugarDeDatos,cantidadMinima,objeto)}>
                        {nombreEliminar}
                    </button>
                </div>
            )}
        </div>
    )
}
export default BottonAddandDelete;