import React from 'react';
import {Input,Select} from '../../Formulario/ModulosFormulario';
import BottonAddandDelete from '../../Generales/BottonAddAndDelete';
import Variables from './Variables';
// Guardara el input que contiene para darle un titulo al subindicador
function TituloSubIndicador(props){
    const OBJETO = props.objeto,
    LUGAR_DE_DATOS = props.lugarDeDatos,
    SUB_INDICADOR = props.subindicador;
    return(
        <div className="col-12 col-md-12">
            <Input datos={{_self: OBJETO, lugar:LUGAR_DE_DATOS.subindicadores[SUB_INDICADOR.id-1], zona: "nombre"}} className="col-8" plhold="Nombre del subindicador" />
        </div>
    )
}
function VariablesSubindicadores(props){
    const OBJETO = props.objeto,
    LUGAR_DE_DATOS = props.lugarDeDatos,
    SUB_INDICADOR = props.subindicador;
    return(
        <div className="col-12 col-md-12 row mt-3 row d-flex justify-content-center">
            {SUB_INDICADOR.variables.map(variable =>
                <Input datos={{_self: OBJETO, lugar: LUGAR_DE_DATOS.subindicadores[SUB_INDICADOR.id-1].variables[variable.id-1], zona:"nombre"}} className="col-3 mb-2 ml-4" key={variable.id} plhold={variable.nombre} />
            )}
        </div>
    )
}
// Será la parte que guardara los responsables del subindicador en proceso
function ResponsablesSubIndicadores(props){
    const OBJETO = props.objeto,
    LUGAR_DE_DATOS = props.lugarDeDatos,
    SUB_INDICADOR = props.subindicador;
    return(
        <div className="col-12 row m-0">
            <BottonAddandDelete objeto={OBJETO} lugarDeDatos={LUGAR_DE_DATOS.subindicadores[SUB_INDICADOR.id-1].responsables} minimo="1" 
            datos={{
                "nombre" : "Responsable",
                "nombreAgregar" : "Agregar otro responsable",
                "nombreEliminar": "Eliminar Responsable"
            }} 
            extra={[]}
            className="p-0" />
            {SUB_INDICADOR.responsables.map(responsable=>
                <Select
                key={responsable.id} 
                datos={
                    {
                        "_self": OBJETO, 
                        "lugar":LUGAR_DE_DATOS.subindicadores[SUB_INDICADOR.id-1].responsables[responsable.id-1],
                        "zona":"idUsuario"
                    }} 
                plhold="Agregar responsable"
                elementos={LUGAR_DE_DATOS.usuarios}
                valor="id"
                opcion="nombre"
                className="col-4"
                />
            )}
        </div>
    )
}
// Compodra el cuerpo completo de los subindicadores
function Subindicadores(props){
    const OBJETO = props.objeto,
    LUGAR_DE_DATOS = props.lugarDeDatos;
    return(
        <div className="col-12">
            <h4>Sub Indicadores</h4>
            <BottonAddandDelete objeto={OBJETO} lugarDeDatos={LUGAR_DE_DATOS.subindicadores} minimo="0" 
            className="p-0"
            datos={{
                "nombre" : "subindicador",
                "nombreAgregar" : "Agregar subindicador",
                "nombreEliminar": "Eliminar subindicador"
            }} 
            extra={[
                {
                    "nombre":"variables",
                    "valor":[]
                },
                {
                    "nombre":"responsables",
                    "valor":[
                        {
                            "id":1,
                            "idUsuario" : ""
                        }
                    ]
                }
            ]}/>
            {LUGAR_DE_DATOS.subindicadores.map(subindicador => {
                let id = subindicador.id;
                return (
                    <div className="col-12 row p-3 subindicador mb-3" key={id}>
                        <div className="col-12">
                            <h5>{subindicador.nombre}</h5>
                        </div>
                        <TituloSubIndicador objeto={OBJETO} lugarDeDatos={LUGAR_DE_DATOS} subindicador={subindicador} />
                        <Variables objeto={OBJETO} lugarDeDatos={LUGAR_DE_DATOS.subindicadores[id-1]} lugarDeDatosPrincipal={OBJETO.state} />
                        <ResponsablesSubIndicadores objeto={OBJETO} lugarDeDatos={LUGAR_DE_DATOS} subindicador={subindicador} />
                    </div>
                )
            })}
        </div>
    )
}
export default Subindicadores;