import React from 'react';
import DecodificaMalos from '../Generales/DecodificaMalos.js';
// Generara las variables que tenga el mando con las etapas que tenga la variable
function VariablesMando(props)
{
    const {porcentajeBueno, porcentajeMedio} = props.porcentaje,
    tipoDeEtapa = props.etapa,
    variables = props.variables,
    seEdita = props.editar,
    onChange = props.onChange,
    porcentaje = props.muestraPorcentaje;
    return(
        <React.Fragment>
           {variables.map(variable =>{
                return(
                    <div className="col-12 row variable" key={variable.id}>
                        <div className="col-9">
                            <span style={{fontWeight:700}}>{DecodificaMalos(variable.nombre)}</span> <span className="float-right"><span style={{fontWeight:700}}>Tipo de etapa:</span> {tipoDeEtapa}</span>
                        </div>
                        <div className="col-10 row">
                            {variable.etapas.map(etapa =>{
                                let color = "";
                                if(etapa.porcentaje < porcentajeBueno){
                                    color = "bg-warning";
                                }
                                if(etapa.porcentaje < porcentajeMedio){
                                    color ="bg-danger"
                                }
                                if(seEdita){
                                    return (
                                        <input type="number" name={etapa.id} idetapa={etapa.idEtapa} idvariable={variable.id} onChange={onChange} className={`col-2 text-center ${color}`} key={etapa.id} defaultValue={etapa.valor} />
                                    )
                                }
                                let valor = etapa.valor;
                                if(porcentaje){
                                    valor = `${etapa.porcentaje}%`;
                                }
                                return(
                                <div className={`col-2 text-center etapa ${color}`} key={etapa.id}>
                                    {valor}
                                </div>
                                )
                            })}
                        </div>
                        <div className="col-2">
                            Total: {Math.round(variable.valorTotal * 100) / 100}
                        </div>
                    </div>
                );
            })}
        </React.Fragment>
    )
}
export default VariablesMando;