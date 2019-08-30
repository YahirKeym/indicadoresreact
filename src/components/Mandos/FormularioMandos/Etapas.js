import React from 'react';
import {Input} from '../../Formulario/ModulosFormulario';
import CambiarEtapas from '../CambiarEtapas';
import DecodificaMalos from '../../Generales/DecodificaMalos';
import Meses from '../../Fechas/Meses';
import OtorgaNombres from './OtorgaNombre';
import Bimestres from '../../Fechas/Bimestres';
// Será el tipo de etapas y la cantidad de ellas que manejaremos. Ejemplo: meses : 12 
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
// Replicara las etapas mediante su cantidad, así le podremos dar un nombre a cada una
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
// Serán los campos para darle un valor a cada etapa.
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
// Será el componente que juntara la parte de las etapas.
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