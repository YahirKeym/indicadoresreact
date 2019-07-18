import React from 'react';
import CuerpoObjetivosMandos from '../components/CuerpoObjetivosMandos.js';
/**
 * Guardara el componente de las variables del mando
 * @param {propiedades} props 
 */
function VariablesMando(props)
{
    const variables = props.variables;
    return(
        <React.Fragment>
            {variables.map(variable =>{
                return(
                    <div className="col-12 row variable" key={variable.id}>
                        <div className="col-12">
                            {quitaEspeciales(variable.nombre)}
                        </div>
                        <div className="col-10 row">
                            {variable.etapas.map(etapa =>{
                                return(
                                <div className="col-2 text-center etapa" key={etapa.id}>
                                    {etapa.valor}
                                </div>
                                )
                            })}
                        </div>
                        <div className="col-2">
                            Total: {variable.valorTotal}
                        </div>
                    </div>
                );
            })}
        </React.Fragment>
    )
}
/**
 * Quita caracteres especiales
 */
function quitaEspeciales(cadena = ""){
    cadena = cadena.replace(/_/gi," ");
    return cadena;
}
export default class MandosProfile extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data:{
                "variables":[],
                 "datos":{  
                    "formula":"",
                    "etapas":0,
                    "tipoDeEtapa":"",
                    "titulo":"",
                    "unidadDeMedida":"",
                    "AceptacionBuena":"0",
                    "AceptacionMedia":"0",
                    "objetivo":"0",
                    "rangos":{  
                       "datos":[],
                       "global":false
                    },
                    "jerarquias":{  
                       "datos":[],
                       "global":true
                    },
                    "usuarios":{  
                       "datos":[]
                    }
                 },
                 "objetivos":[],
                 "objetivosData":{  
                    "titulo":"",
                    "descripcion":""
                 },
                 "rangos":[],
                 "jeraraquias":[],
                 "users":[],
                 "errors":{  
                    "formulaNoCoincideConVariables":true
                 },
                 "acciones":[  
           
                 ],
                 "objetivoShow":true
            }
        }
    }
    componentDidMount()
    {
        this.traerDatos();
    }
    /**
     * Traera los datos de los objetivos y del mando.
     */
    traerDatos = async () =>{
        const mando= await fetch(`${this.props.url}&action=select&id=${this.props.match.params.mandoId}`);
        const responseMando = await mando.json();
        if(responseMando.status)
        {
            this.setState({
                data: responseMando.datos
            })
        }
    }
    render()
    {
        return (
            <CuerpoObjetivosMandos url="" titulo={this.state.data.datos.titulo} descripcion={this.state.data.objetivosData.descripcion}>
                <div className="col-12 mt-3">
                    <button className="btn-light btn">Editar datos</button>
                </div>
                {console.log(this.state.data.variables)}
                <div className="col-12 p-2 mando-control">
                    <VariablesMando variables={this.state.data.variables} />
                </div>
                <div className="col-12">
                    <h4>Aquí debería de ir una grafica</h4>
                </div>
            </CuerpoObjetivosMandos>
        );
    }
}