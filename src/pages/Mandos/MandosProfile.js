import React from 'react';
import CuerpoObjetivosMandos from '../../components/CuerpoObjetivosMandos.js';
import {Chart} from 'react-google-charts';
import Loader from '../../components/Loader.js';
import {Helmet} from 'react-helmet'
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
                            Total: {Math.round(variable.valorTotal * 100) / 100}
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
                    },
                    "minimaEscala":0,
                    "maximaEscala":0
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
        this.contadorEtapas = 1;
        this.state.data.variables[0].etapas.map(etapas1=>{
            return this.state.data.variables[1].etapas.map(etapas2 => {
                if(etapas1.idEtapa === etapas2.idEtapa)
                {
                    return aEtapas.push([etapas1.nombreEtapa,parseInt(etapas1.valor),parseInt(etapas2.valor)])

                }else{
                    return [];
                }
            })
            this.contadorEtapas++;
        }
        )
        this.setState({
            etapasChart: aEtapas,
        })
    }
    handleChangeEscala = e =>{
        let valor = e.target.value;
        let name = e.target.name;
        this.setState({
            data:{
                ...this.state.data,
                datos:{
                    ...this.state.data.datos,
                    [name] : valor
                }
            }
        })
    }
     /**
     * 
     */
    handleChangeAction = e =>{
        var nuevoStado = this.state;
        const id = e.target.getAttribute("id");
        var Valor = e.target.value;
        if(Valor.length === 0)
        {
            Valor = `Acción ${id}`
        }
        nuevoStado.data.acciones[id-1]['nombre'] = Valor;
        this.setState(nuevoStado);
    }
    /**
     * Agregara una acción de así requerirlo.
     */
    handleAddAction = e =>{
        this.setState(
            {
                data:{
                    ...this.state.data,
                    acciones:[
                        ...this.state.data.acciones,
                        {
                             id: this.state.data.acciones.length +1,
                             nombre: `Acción ${this.state.data.acciones.length + 1}`
                        }
                    ]
                }
            }
        )
    }
    /**
     * Quitara una acción de abajo hacía arriba
     */
    handleQuitAction = e =>{
        const cantidadDeAciones = this.state.data.acciones.length;
        if(cantidadDeAciones > 0)
        {
            const acciones = this.state.data.acciones.splice(-cantidadDeAciones,cantidadDeAciones-1)
            this.setState(
                {
                    data:{
                        ...this.state.data,
                        acciones: acciones
                    }
                }
            )
        }
    }
    /**
     * 
     */
    handleChangeEtapas = async e => 
    {
        const idVariable = e.target.getAttribute("idvariable") - 1;
        let idEtapa = e.target.getAttribute("idetapa") -1;
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
            let _self = this;
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
                _self.setState({
                    data: nuevoStado
                })
            }catch(e)
            {
                _self.setState({
                    errors:{
                        ..._self.state.errors,
                        formulaNoCoincideConVariables: true
                    }
                })
            }
            `
            eval(codigoEnString)
        }
        let formula = undefined
        this.state.data.variables.map(variable=>{
            let idVariable = variable.id -1;
            let etapa = parseInt(nuevoStado.variables[idVariable].etapas[idEtapa].valor);
            let ideEtapa= idEtapa
            nuevoStado.variables[0].etapas.map(etapaEstadoUno =>{
                if(ideEtapa === etapaEstadoUno.idEtapa-1){
                        formula = (100*etapa)/etapaEstadoUno.valor;
                    }
                })
                if(formula === Infinity){
                    formula = 100;
                }
                nuevoStado.variables[idVariable].etapas[idEtapa].porcentaje = formula;
        })
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
   handleChangeAnalisisDeInformacion = e => {
        let valor = e.target.value;
        this.setState({
            data:{
                ...this.state.data,
                datos:{
                    ...this.state.data.datos,
                    'analisisDeInformacion' : valor
                }
            }
        })
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
        if(this.state.data.datos.minimaEscala === undefined){
            this.state.data.datos.minimaEscala = 0;            
        }
        if(this.state.data.datos.maximaEscala === undefined){
            this.state.data.datos.maximaEscala = 0;            
        }
        if(this.state.data.datos.analisisDeInformacion === undefined){
            this.state.data.datos.analisisDeInformacion = "";
        }
        return (
            <React.Fragment>
                <Helmet>
                    <title>Indicadores - {this.state.data.objetivosData.titulo}</title>
                </Helmet>
                <div className="col-12 d-flex justify-content-center">
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
                            {this.state.data.acciones.length !== 0 && (
                                <React.Fragment>
                                    <div className="col-12 d-flex justify-content-center">
                                        <h4>Acciones a tomar</h4>
                                    </div>
                                    {this.state.data.acciones.map(action => {
                                        return (
                                            <div className="acciones col-12 p-2 mando-text mb-2"><p>{action.nombre}</p></div>
                                            )
                                        })}
                                </React.Fragment>
                            )}
                        </div>
                        <div className="col-12 mt-3">
                            <button edicion={`${this.state.editar}`} className="btn-light btn" onClick={this.handleChangeEdit}>{mensajeEditar}</button>
                        </div>
                        <div className="col-12 p-2 mando-control">
                            <VariablesMando onChange={this.handleChangeEtapas} etapa={this.state.data.datos.tipoDeEtapa} editar={this.state.editar} variables={this.state.data.variables} porcentaje={porcentaje}/>
                        </div>
                        {this.state.editar && (
                            <React.Fragment>
                                <div className="col-12 row m-0 mt-2">
                                    <div className="col-4">
                                        <label htmlFor="minimaEscala">Escala mínima</label>
                                        <input type="number" placeholder="Escala Mínima" name="minimaEscala" 
                                        onChange={this.handleChangeEscala} defaultValue={this.state.data.datos.minimaEscala} 
                                        className="form-control"/>
                                    </div>
                                    <div className="col-4 ml-3">
                                        <labe htmlFor="maximaEscala">Escala máxima</labe>
                                        <input type="number" placeholder="Escala Máxima" name="maximaEscala" 
                                        onChange={this.handleChangeEscala} defaultValue={this.state.data.datos.maximaEscala} 
                                        className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-12 row m-0 mt-2">
                                    {this.state.data.acciones.map(accion => {
                                        return(
                                            <div key={accion.id} className="col-12 mt-2">
                                                <input type="text" tipo="action" id={accion.id} onChange={this.handleChangeAction} defaultValue={accion.nombre} className="col-6 form-control" name={accion.nombre} />
                                            </div>
                                        )
                                    })}
                                    <div className="col-12 mt-3 row">
                                        <div className="col-4">
                                            <a className="text-primary accion" onClick={this.handleAddAction}>Agregar Acción a tomar +</a>
                                        </div>
                                        {this.state.data.acciones.length !== 0 && (
                                            <div className="col-4">
                                                <a className="text-primary accion" onClick={this.handleQuitAction}>Eliminar Acción -</a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-12 row m-0 mt-2">
                                            <textarea placeholder="Analisis de información" onChange={this.handleChangeAnalisisDeInformacion} className="form-control" defaultValue={this.state.data.datos.analisisDeInformacion}></textarea>
                                </div>
                            </React.Fragment>
                        )}
                        {this.state.data.datos.analisisDeInformacion.length !== 0 && (
                            <React.Fragment>
                                <div className="col-12">
                                    <h4>Análisis de información</h4>
                                </div>
                                <div className="col-12 p-2 mando-text">
                                    {this.state.data.datos.analisisDeInformacion}
                                </div>
                            </React.Fragment>
                        )}
                    </CuerpoObjetivosMandos>
                </div>
                <div className="col-12 mb-5 row d-flex justify-content-center">
                    <Chart
                        width="100%"
                        height={300}
                        chartType="ColumnChart"
                        loader={<Loader />}
                        data={this.state.etapasChart}
                        options={{
                            title: acentosEncodeJava(this.state.data.datos.titulo),
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
                                minValue: this.state.data.datos.minimaEscala,
                                maxValue: this.state.data.datos.maximaEscala
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