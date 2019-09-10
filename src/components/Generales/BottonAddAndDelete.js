import React from 'react';
import AddOneElement from "./AddOneElement";
import DeleteOneElement from "./DeleOneElement";
/**
 * El componente de BottonAddAnDelete ayudara a crear y eliminar elementos con 
 * ayuda de la función AddOneElement y DeleteOneElement.
 * @param {properties} props Son las propiedades del componente.
 * @param {object} objeto Es el objeto principal de la clase o función (this)
 * @param {array} lugarDeDatos Será el lugar donde proviene el arreglo de datos.
 * @param {integer} minimo Será la cantidad minima de datos la cual puede haber
 * en el lugar de los datos (arreglo)
 */
function BottonAddandDelete(props){
    const oObject = props.objeto,
    aLugarDeDatos = props.lugarDeDatos,
    iCantidadMinima = parseInt(props.minimo),
    datosExtra = props.extra,
    {nombre, nombreAgregar, nombreEliminar} = props.datos,
    className=props.className;
    return(
        <div className="col-12 m-0 mt-3 p-0 row mb-3">
            <div className={`col-4 m-0 ${className}`}>
                <button className=" btn btn-success" onClick={e => {
                    AddOneElement(e,oObject,aLugarDeDatos,nombre,datosExtra);
                }}>
                    {nombreAgregar}
                </button>
            </div>
            {aLugarDeDatos.length !== iCantidadMinima && (
                <div className="col-4 m-0 p-0">
                    <button className="btn btn-danger" 
                    onClick={e => DeleteOneElement(e,aLugarDeDatos,iCantidadMinima,oObject)}>
                        {nombreEliminar}
                    </button>
                </div>
            )}
        </div>
    )
}
export default BottonAddandDelete;