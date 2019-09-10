import React from 'react';
import {Input} from '../../Formulario/ModulosFormulario';
import CambiarEtapas from '../CambiarEtapas';
import DecodificaMalos from '../../Generales/DecodificaMalos';
import Meses from '../../Fechas/Meses';
import OtorgaNombres from './OtorgaNombre';
import Bimestres from '../../Fechas/Bimestres';
/**
 * El componente TipoDeEtapas se encargara de darle un configuración a las etapas de
 * los indicadores.
 * @param {properties} props Son las propiedades del componente
 * @param {object} objeto  Será el objeto del componente padre (this)
 * @param {array} lugarDeDatos Es el lugar donde los datos se encuentran de manerá
 * principal y que tiene como minimo una key de acciones.
 */
function TipoDeEtapas(props){
    const objeto = props.objeto,
    lugarDeDatos = props.lugarDeDatos;
    return(
        <div className="col-12 row mt-3">
            <div className="col-12">
                <label htmlFor="etapas">Etapas que tendra este mando </label>
            </div>
            <div className="col-12 col-lg-6"> 
                <Input type="text" 
                datos={{_self:objeto,lugar:lugarDeDatos.datos,zona:"tipoDeEtapa"}} 
                plhold="Meses" 
                dfv="Meses"
                callback={true}
                function={e => {
                    e.preventDefault();
                    const valor = e.target.value.toLowerCase();
                    if(valor ==="m" || valor ==="me" || valor ==="mes" || valor ==="mese" || valor ==="meses"){
                        OtorgaNombres(objeto,lugarDeDatos,Meses())
                    }
                    if(valor ==="b" || valor ==="bi" || valor ==="bim" || valor ==="bime" || valor ==="bimestre"){
                        OtorgaNombres(objeto,lugarDeDatos,Bimestres())
                    }
                }}/> 
            </div>
            <div className="col-12 col-lg-6 mb-3">
                <Input type="number" datos={{_self:objeto,lugar:lugarDeDatos.datos,zona:"etapas"}} plhold="12" dfv="12" callback={true} function={objeto.entregaEtapasALasVariables}/>
            </div>
        </div>
    )
}
/**
 * El componente NombreDeEtapas se encargara de poder darle un nombre personalizado a 
 * cada etapa del indicador.
 * @param {properties} props Son las propiedades del componente
 * @param {object} objeto  Será el objeto del componente padre (this)
 * @param {array} lugarDeDatos Es el lugar donde los datos se encuentran de manerá
 * principal y que tiene como minimo una key de acciones.
 */
function NombreDeEtapas(props){
    const objeto = props.objeto,
    lugarDeDatos = props.lugarDeDatos;
    return(
        <div className="col-12 row m-0 p-0">
            {lugarDeDatos.etapas.map(etapa => {
                return(
                    <div className="col-3" key={etapa.id}>
                        <Input type="text" datos={{_self:objeto,lugar:lugarDeDatos.variables[0].etapas[etapa.idEtapa - 1],zona:"nombre"}} dfv={lugarDeDatos.variables[0].etapas[etapa.idEtapa - 1].nombre} plhold={`Etapa ${etapa.idEtapa} nombre`} />
                    </div>
                )
            })}
        </div>
    )
}
/**
 * El componente ValoresEtapas se encargara de crear las etapas que hayan pedido
 * así mismo podrá darle un valor unico a cada etapa.
 * @param {properties} props Son las propiedades del componente
 * @param {object} objeto  Será el objeto del componente padre (this)
 * @param {array} lugarDeDatos Es el lugar donde los datos se encuentran de manerá
 * principal y que tiene como minimo una key de acciones.
 */
function ValoresEtapas(props){
    const objeto = props.objeto,
    lugarDeDatos = props.lugarDeDatos;
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
                                if(etapa.porcentaje < lugarDeDatos.datos.AceptacionBuena)
                                {
                                    color = "border border-warning";
                                }
                                if(etapa.porcentaje < lugarDeDatos.datos.AceptacionMedia)
                                {
                                    color = "border border-danger";
                                }
                                return(<input type="number" placeholder="0" defaultValue={etapa.valor} idetapa={etapa.idEtapa} onChange={e=>{CambiarEtapas(e,objeto,lugarDeDatos.variables,lugarDeDatos,lugarDeDatos.datos.valorMinimo)}} tipo="etapa" name={etapa.id} idvariable={variable.id} className={`col-2 form-control ${color}`} key={etapa.id} />)
                            })}
                        </div>
                        <div className="col-12 col-lg-4 text-center">
                            <h5>{DecodificaMalos(variable.nombre)}: <span style={{fontWeight:100}}>{Math.round(variable.valorTotal* 100) / 100} {DecodificaMalos(lugarDeDatos.datos.unidadDeMedida)}</span></h5>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
/**
 * Uniremos los componentes para poder formar el componente de Etapas en general.
 * @param {properties} props Son las propiedades del componente
 * @param {object} objeto  Será el objeto del componente padre (this)
 * @param {array} lugarDeDatos Es el lugar donde los datos se encuentran de manerá
 * principal y que tiene como minimo una key de acciones.
 */
function Etapas(props){
    const objeto = props.objeto,
    lugarDeDatos = props.lugarDeDatos;
    return (
        <React.Fragment>
            <div className="col-12 mt-3">
                <h4>Etapas del indicador</h4>
            </div>
            <TipoDeEtapas objeto={objeto} lugarDeDatos={lugarDeDatos} />
            <div className="col-12 row mt-3 m-0">
                <NombreDeEtapas objeto={objeto} lugarDeDatos={lugarDeDatos} />
                <ValoresEtapas objeto={objeto} lugarDeDatos={lugarDeDatos} />
            </div>
        </React.Fragment>
    )
}
export default Etapas;