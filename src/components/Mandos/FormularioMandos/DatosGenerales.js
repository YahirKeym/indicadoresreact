import React from 'react';
import {Input,Select} from '../../Formulario/ModulosFormulario';
// Serpa el input de la unidad de medida
function UnidadDeMedida(props){
    const objeto=props.objeto,
    lugarDeDatos = props.lugarDeDatos;
    return(
        <div className="col-12 col-md-6">
            <div className="col-12">
                <label htmlFor="unidadDeMedida">UDM</label>
            </div>
            <Input type="text" datos={{_self:objeto,lugar: lugarDeDatos.datos,zona:"unidadDeMedida"}} plhold="Unidad de Medida" />
        </div>
    )
}
// Serán los inputs de aceptación, recordando que arriba de buena es buena aceptacion, abajo de buena es media y abajo de media es mala
function Aceptacion(props){
    const objeto=props.objeto,
    lugarDeDatos = props.lugarDeDatos;
    return(
        <div className="col-12 col-md-6 row">
            <div className="col-12">
                <label htmlFor="AceptacionBuena">Aceptación %</label>
            </div>
            <div className="col-4">
                <Input datos={{_self:objeto,lugar:lugarDeDatos.datos,zona:"AceptacionBuena"}} plhold="94" dfv={lugarDeDatos.datos.AceptacionBuena} className="form-control border border-success" />
            </div>
            <div className="col-4">
                <Input datos={{_self:objeto,lugar:lugarDeDatos.datos,zona:"AceptacionMedia"}} plhold="80" dfv={lugarDeDatos.datos.AceptacionMedia} className="form-control border border-warning"/>
            </div>
        </div>
    )
}
// Será el tipo de indicador y la forma que este tendra. Ejemplo: Tipo: Resultados, Forma: incremento
function TipoDeIndicador(props){
    const objeto=props.objeto,
    lugarDeDatos = props.lugarDeDatos;
    return(
        <div className="col-12 row m-0 mt-3">
            <span className="col-12">Tipo de Indicador: </span> 
            <Select datos={{_self:objeto,lugar:lugarDeDatos.datos,zona:"tipoIndicador"}} 
            plhold="Selecciona el tipo de indicador"
            valor="id"
            className="col-4" 
            elementos={lugarDeDatos.tipoDeIndicador}/>
            <Select datos={{_self:objeto,lugar:lugarDeDatos.datos,zona:"formaDeIndicador"}} 
            plhold="Selecciona la forma en la que se dara el indicador"
            className="col-5 ml-3"
            valor="titulo"
            titulo="nombre"
            elementos={lugarDeDatos.manejoDeIndicador}/>
        </div>
    )
}
// Será el componente que guardara los datos generales del indicador
function DatosGenerales(props){
    const objeto=props.objeto,
    lugarDeDatos = props.lugarDeDatos;
    return(
        <div className="col-12 row mt-3">
            <div className="col-12">
                <h4>Datos generales</h4>
            </div>
            <UnidadDeMedida objeto={objeto} lugarDeDatos={lugarDeDatos} />
            <Aceptacion objeto={objeto} lugarDeDatos={lugarDeDatos} />
            <TipoDeIndicador objeto={objeto} lugarDeDatos={lugarDeDatos} />
        </div>
    )
}
export default DatosGenerales;