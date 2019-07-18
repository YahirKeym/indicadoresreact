import React from 'react';
import CuerpoObjetivosMandos from '../components/CuerpoObjetivosMandos.js';
import {Chart} from 'react-google-charts';
import Loader from '../components/Loader.js';
/**
 * Cambiara los acentos que vengan con codificación java
 */
function acentosEncodeJava(cadena = ""){
    cadena = cadena.replace(/u00E1/gi,"á");
    cadena = cadena.replace(/u00C1/gi,"Á");
    cadena = cadena.replace(/u00E9/gi,"é");
    cadena = cadena.replace(/u00C9/gi,"É");
    cadena = cadena.replace(/u00ED/gi,"í");
    cadena = cadena.replace(/u00CD/gi,"Í");
    cadena = cadena.replace(/u00F3/gi,"ó");
    cadena = cadena.replace(/u00D3/gi,"Ó");
    cadena = cadena.replace(/u00D3/gi,"ú");
    cadena = cadena.replace(/u00DA/gi,"Ú");
    cadena = cadena.replace(/u00F1/gi,"ñ");
    cadena = cadena.replace(/u00D1/gi,"Ñ");
    return cadena;
}
/**
 * Guardara el componente de las variables del mando
 * @param {propiedades} props 
 */
function VariablesMando(props)
{
    const variables = props.variables;
    const seEdita = props.editar;
    if(seEdita){
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
        );
    }
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
            },
            etapasChart: []
        }
    }
    /**
     * 
     */
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
        this.datosParaChart();
    }
    /**
     * 
     */
    datosParaChart = () => {
        let nombreDeVariableUno = quitaEspeciales(this.state.data.variables[0].nombre);
        let nombreDeVariableDos = quitaEspeciales(this.state.data.variables[1].nombre);
        let aEtapas = [
            ["Etapas",nombreDeVariableUno,nombreDeVariableDos]
        ];
        let contadorEtapas = 1;
        this.state.data.variables[0].etapas.map(etapas1=>{
            this.state.data.variables[1].etapas.map(etapas2 => {
                if(etapas1.idEtapa === etapas2.idEtapa)
                {
                    aEtapas.push([String(contadorEtapas),parseInt(etapas1.valor),parseInt(etapas2.valor)])

                }
            })
            contadorEtapas++;
        }
        )
        this.setState({
            etapasChart: aEtapas,
        })
    }
    render()
    {
        console.log(this.props.history)
        return (
            <React.Fragment>

                <CuerpoObjetivosMandos textSuccess="Guardar" url="" titulo={this.state.data.datos.titulo} descripcion={this.state.data.objetivosData.descripcion}>
                    <div className="col-12 mt-3">
                        <button className="btn-light btn">Editar datos</button>
                    </div>
                    <div className="col-12 p-2 mando-control">
                        <VariablesMando variables={this.state.data.variables} />
                    </div>
                    <div className="col-12">
                    </div>
                </CuerpoObjetivosMandos>
                <div className="col-12 row d-flex justify-content-center">
                    <Chart
                        width="100%"
                        height={300}
                        chartType="ColumnChart"
                        loader={<Loader />}
                        data={this.state.etapasChart}
                        options={{
                            title: this.state.data.datos.titulo,
                            chartArea: { width: '70%', backgroundColor:'rgba(0,0,0,0)' },
                            backgroundColor: {
                                fill: '#000',
                                fillOpacity: 0
                            },
                            hAxis: {
                                title: 'Etapas',
                                minValue: 0,
                            },
                            vAxis: {
                                title: acentosEncodeJava(this.state.data.datos.unidadDeMedida),
                                minValue: 0
                            },
                            colors:["#289c7c","#007bff"]
                        }}
                        
                        legendToggle
                        />
                </div>
            </React.Fragment>
        );
    }
}