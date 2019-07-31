import React from 'react';
import {Input} from '../../Formulario/ModulosFormulario';
import DeleteOneElement from '../../Generales/DeleOneElement';
import AddOneElement from '../../Generales/AddOneElement';
import BottonAddandDelete from '../../Generales/BottonAddAndDelete';
function TituloSubIndicador(props){
    const objeto = props.objeto,
    lugarDeDatos = props.lugarDeDatos,
    subindicador = props.subindicador;
    return(
        <div className="col-12">
            <Input datos={{_self: objeto, lugar:lugarDeDatos.subindicadores[subindicador.id], zona: "nombre"}} plhold="Nombre del subindicador" />
        </div>
    )
}
function Subindicadores(props){
    const objeto = props.objeto,
    lugarDeDatos = props.lugarDeDatos;
    return(
        <div className="col-12">
            <h4>Sub Indicadores</h4>
            <BottonAddandDelete objeto={objeto} lugarDeDatos={lugarDeDatos.subindicadores} minimo="0" 
            datos={{
                "nombre" : "subindicador",
                "nombreAgregar" : "Agregar subindicador",
                "nombreEliminar": "Eliminar subindicador"
            }} 
            extra={[
                {"nombre":"variables","valor":[{
                    "id": 1,
                    "nombre": "subVariable 1"
                }]}
            ]}/>
            {lugarDeDatos.subindicadores.map(subindicador => {
                let id = subindicador.id;
                return (
                    <div className="col-12 row" key={id}>
                        <TituloSubIndicador objeto={objeto} lugarDeDatos={lugarDeDatos} subindicador={subindicador} />
                        <BottonAddandDelete objeto={objeto} lugarDeDatos={lugarDeDatos.subindicadores[id-1].variables} minimo="1" 
                        datos={{
                            "nombre" : "subVariable",
                            "nombreAgregar" : "Agregar subVariable",
                            "nombreEliminar": "Eliminar subVariable"
                        }} 
                        extra={[]}/>
                        <div className="col-12 row">
                            {subindicador.variables.map(variable =>
                                <Input datos={{_self: objeto, lugar: lugarDeDatos.subindicadores[id-1].variables[variable.id], zona:"nombre"}} plhold={variable.nombre} />
                            )}
                        </div>
                        <div className="col-12">
                            <input placeholder="responsable"/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default Subindicadores;