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
    porcentaje = props.muestraPorcentaje,
    heredado = props.heredado;
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
                                let idVariable = variable.id;
                                if(heredado){
                                    idVariable = variable.id+1;
                                }
                                if(seEdita){
                                    return (
                                        <React.Fragment>
                                            <input type="number" name={etapa.id} idetapa={etapa.idEtapa} idvariable={idVariable} onChange={onChange} className={`col-2 text-center ${color}`} key={etapa.id} defaultValue={etapa.valor} />
                                        </React.Fragment>
                                    )
                                }
                                let valor = etapa.valor;
                                if(porcentaje){
                                    valor = `${Math.round(etapa.porcentaje*100)/100}%`;
                                }
                                return(
                                    <div className={`col-1 text-center`} key={etapa.id}>
                                        {variable.id === 1 && (
                                                <div className="col-12">
                                                    {DecodificaMalos(etapa.nombre)}
                                                </div>
                                            )}
                                        <div className={`etapa ${color}`}>
                                            {valor}
                                        </div>
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