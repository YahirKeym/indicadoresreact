import React from 'react';
import {Input,Select} from '../../Formulario/ModulosFormulario';
import BottonAddandDelete from '../../Generales/BottonAddAndDelete';
import Variables from './Variables';
import DecodificaMalos from '../../Generales/DecodificaMalos';
import CambiarEtapas from '../CambiarEtapas';
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
function ValoresEtapas(props){
    const objeto = props.objeto,
    lugarDeDatos = props.lugarDeDatos,
    lugarDeDatosPrincipal = props.lugarDeDatosPrincipal;
    return(
        <div className="col-12 col-lg-12 row mt-3 m-0">
            {lugarDeDatos.variables.map(variable=>{
                return(
                    <div className="row col-12 mt-3" key={variable.id}>
                        <div className="col-12">
                            Valor de las etapas de {DecodificaMalos(variable.nombre)} 
                        </div>
                        <div className="col-12 p-0 col-lg-8 row">
                            {variable.etapas.map(etapa=>{
                                let color = "border border-success";
                                if(etapa.porcentaje < lugarDeDatosPrincipal.datos.AceptacionBuena)
                                {
                                    color = "border border-warning";
                                }
                                if(etapa.porcentaje < lugarDeDatosPrincipal.datos.AceptacionMedia)
                                {
                                    color = "border border-danger";
                                }
                                return(<input type="number" placeholder="0" defaultValue={etapa.valor} idetapa={etapa.idEtapa} onChange={e=>{
                                    CambiarEtapas(e,objeto,lugarDeDatos.variables,lugarDeDatosPrincipal,lugarDeDatosPrincipal.datos.valorMinimo,true)
                                }} tipo="etapa" name={etapa.id} idvariable={variable.id} className={`col-2 form-control ${color}`} key={etapa.id} />)
                            })}
                        </div>
                        <div className="col-12 col-lg-4 text-center">
                            <h5>{DecodificaMalos(variable.nombre)}: <span style={{fontWeight:100}}>{Math.round(variable.valorTotal* 100) / 100} {DecodificaMalos(lugarDeDatosPrincipal.datos.unidadDeMedida)}</span></h5>
                        </div>
                    </div>
                )
            })}
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
                    "valor": LUGAR_DE_DATOS.variables
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
                            <h5>{DecodificaMalos(subindicador.nombre)}</h5>
                        </div>
                        <TituloSubIndicador objeto={OBJETO} lugarDeDatos={LUGAR_DE_DATOS} subindicador={subindicador} />
                        <Variables objeto={OBJETO} lugarDeDatos={LUGAR_DE_DATOS.subindicadores[id-1]} lugarDeDatosPrincipal={OBJETO.state} />
                        <ResponsablesSubIndicadores objeto={OBJETO} lugarDeDatos={LUGAR_DE_DATOS} subindicador={subindicador} />
                        <ValoresEtapas objeto={OBJETO} lugarDeDatos={LUGAR_DE_DATOS.subindicadores[id-1]} lugarDeDatosPrincipal={OBJETO.state} />
                    </div>
                )
            })}
        </div>
    )
}
export default Subindicadores;