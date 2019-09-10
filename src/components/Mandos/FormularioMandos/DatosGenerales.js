import React from 'react';
import {Input,Select} from '../../Formulario/ModulosFormulario';
/**
 * El componente UnidadDeMedida guardara el estilo que se muestra
 * en el input donde le indicaremos el tipo de unidad de medida que
 * se utilizara en el indicador.
 * @param {properties} props Son las propiedades del componente
 * @param {object} objeto  Será el objeto del componente padre (this)
 * @param {array} lugarDeDatos Es el lugar donde los datos se encuentran de manerá
 * principal y que tiene como minimo una key de acciones.
 */
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
/**
 * El componente Aceptación guardara el tipo de aceptación minima que el indicador
 * debe de tener. 
 * default:
 * Si la aceptación es mayor a 94% es buena, si es menor es media, y si es menor a 
 * 80% es mala. 
 * @param {properties} props Son las propiedades del componente
 * @param {object} objeto  Será el objeto del componente padre (this)
 * @param {array} lugarDeDatos Es el lugar donde los datos se encuentran de manerá
 * principal y que tiene como minimo una key de acciones.
 */
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
/**
 * El componente TipoDeIndicador guardara la configuración del tipo de indicador que se maneja
 * y la naturaleza que este tiene:
 * Tipo de indicador: - Comportamentable
 * Forma de indicador: - Incremento
 * @param {properties} props Son las propiedades del componente
 * @param {object} objeto  Será el objeto del componente padre (this)
 * @param {array} lugarDeDatos Es el lugar donde los datos se encuentran de manerá
 * principal y que tiene como minimo una key de acciones.
 */
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
/**
 * El componente DatosGenerales se encarga de guardar la unidad de medida del indicador,
 * la aceptación en porcentaje que este tendrá, y el tipo de indicador que se manejara.
 * @param {properties} props Son las propiedades del componente
 * @param {object} objeto  Será el objeto del componente padre (this)
 * @param {array} lugarDeDatos Es el lugar donde los datos se encuentran de manerá
 * principal y que tiene como minimo una key de acciones.
 */
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