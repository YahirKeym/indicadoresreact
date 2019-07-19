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
    const {porcentajeBueno, porcentajeMedio} = props.porcentaje;
    const tipoDeEtapa = props.etapa;
    const variables = props.variables;
    const seEdita = props.editar;
    const onChange = props.onChange;
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
                                     let color = "";
                                     if(etapa.porcentaje < porcentajeBueno){
                                         color = "border-warning";
                                     }
                                     if(etapa.porcentaje < porcentajeMedio){
                                         color ="border-danger"
                                     }
                                return(
                                    <input type="number" name={etapa.id} idetapa={etapa.idEtapa} idvariable={variable.id} onChange={onChange} className={`col-2 text-center ${color}`} key={etapa.id} defaultValue={etapa.valor} />
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
                        <div className="col-9">
                            <span style={{fontWeight:700}}>{quitaEspeciales(variable.nombre)}</span> <span className="float-right"><span style={{fontWeight:700}}>Tipo de etapa:</span> {tipoDeEtapa}</span>
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
                                return(
                                <div className={`col-2 text-center etapa ${color}`} key={etapa.id}>
                                    {`${etapa.valor}`}
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
            etapasChart: [],
            editar:false,
            update: undefined
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
    /**
     * 
     */
    handleChangeEtapas = async e => 
    {
        const idVariable = e.target.getAttribute("idvariable") - 1;
        const idEtapa = e.target.getAttribute("idetapa") -1;
        const nombreEtapa = e.target.name;
        let Valor = e.target.value;
        if(Valor.length === 0)
        {
            Valor = 0;
        }
        if(Valor === "-"){
            Valor = 0;
        }
        const nuevoStado = await this.handleMantenerEtapas(idVariable, idEtapa, Valor, nombreEtapa);
        this.setState({
            data:nuevoStado
        });
        if(nombreEtapa === `${idVariable}_${idEtapa+1}`)
        {
            let str = "var ";
            let cantidadDeVariables = this.state.data.variables.length;
            let contadorVariables = 0;
            this.state.data.variables.map(variable => {
                str += variable.nombre;
                str +=`=parseFloat(nuevoStado.variables[${variable.id-1}]['etapas'][idEtapa]['valor'])`;
                contadorVariables++;
                if(contadorVariables !== cantidadDeVariables)
                {
                    str += ",";
                }
            })
            let formulaString = this.state.data.datos.formula;
            if(formulaString.length === 0)
            {
                formulaString= undefined;
            }
            let codigoEnString =  `${str}
                                   try{
                                    var formula = ${formulaString};
                                    let porcentaje = formula;
                                    if(idVariable === 0){
                                        porcentaje = 100;
                                    }
                                    const variableValor = parseFloat(nuevoStado.variables[idVariable]['etapas'][idEtapa]['valor']);
                                    if(idVariable > 1 ){
                                        porcentaje = (100*variableValor)/Variable_1;
                                    }
                                    if(porcentaje === Infinity){
                                        porcentaje = 100;
                                    }
                                    nuevoStado.variables[idVariable]['etapas'][idEtapa]['porcentaje'] = porcentaje;
                                    this.setState({
                                        data: nuevoStado
                                    })
                                   }catch(e)
                                   {
                                       this.setState({
                                           errors:{
                                               ...this.state.errors,
                                               formulaNoCoincideConVariables: true
                                           }
                                       })
                                   }
                                `
            eval(codigoEnString)
        }
        this.datosParaChart();
    }
    /**
    * Nos ayudara a escribir solo sobre la etapa que estamos seleccionando
    */
   handleMantenerEtapas = (idVariable, idEtapa, Valor, nombreEtapa) => 
   {
       var nuevoStado = this.state.data;
       if(nombreEtapa === `${idVariable}_${idEtapa+1}`)
       {
           var Suma = 0;
           const Etapas = nuevoStado.variables[idVariable]['etapas'];
           Etapas[idEtapa]['valor'] = Valor;
           const valorPrincipalDePorcentaje = nuevoStado.variables[0]['etapas'][idEtapa]['valor'];
           for (let index = 0; index < Etapas.length; index++) {
               Suma = Suma + parseFloat(Etapas[index]['valor']);
           }
           nuevoStado.variables[idVariable]['valorTotal'] = Suma;
       }
       return nuevoStado;
   }
   /**
    * Ayudara amandar los datos actualizados del indicador
    */
   handleUpdate = async e => {
        e.preventDefault();
        const datos = JSON.stringify(this.state.data);
        let cadenaLimpia = datos.replace(/&/gi,"%26");
        const req = await fetch(`${this.props.url}&action=edit&data=${cadenaLimpia}`);
        const response = await req.json();
        if(response.status){
            this.setState({
                update: true,
                editar: false 
            })
        }
    }
    /**
     * Ayudara a abrir los campos para que puedan ser editados 
     */
    handleChangeEdit = e =>{
        e.preventDefault();
        let Valor = false;
        if(this.state.editar === false){
            Valor = true; 
        }
        this.setState({
            editar: Valor
        })
    }
    /**
     * 
     */
    render()
    {
        let porcentaje = {
            porcentajeBueno: this.state.data.datos.AceptacionBuena,
            porcentajeMedio: this.state.data.datos.AceptacionMedia,
        }
        let mensajeEditar = "Editar datos";
        if(this.state.editar){
            mensajeEditar = "Dejar de editar";
        }
        return (
            <React.Fragment>
                <CuerpoObjetivosMandos 
                textSuccess="Guardar" 
                url="" 
                titulo={this.state.data.datos.titulo}
                subtitulo={this.state.data.objetivosData.titulo} 
                descripcion={this.state.data.objetivosData.descripcion}
                history={this.props.history}
                oneProfile={true}
                Delete={this.props.url}
                id={this.state.data.id}
                isProfile={true}
                save={this.handleUpdate}
                >
                    <div className="col-12 mt-3 row  d-flex justify-content-center">
                        <div className="col-12 d-flex justify-content-center">
                            <h4>Acciones a tomar</h4>
                        </div>
                        {this.state.data.acciones.map(action => {
                            return (
                                    <div className="acciones p-2 col-4 mt-3">{action.nombre}</div>
                            )
                        })}
                    </div>
                    <div className="col-12 mt-3">
                        <button edicion={`${this.state.editar}`} className="btn-light btn" onClick={this.handleChangeEdit}>{mensajeEditar}</button>
                    </div>
                    <div className="col-12 p-2 mando-control">
                        <VariablesMando onChange={this.handleChangeEtapas} etapa={this.state.data.datos.tipoDeEtapa} editar={this.state.editar} variables={this.state.data.variables} porcentaje={porcentaje}/>
                    </div>
                    <div className="col-12">
                    </div>
                </CuerpoObjetivosMandos>
                <div className="col-12 mb-5 row d-flex justify-content-center">
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