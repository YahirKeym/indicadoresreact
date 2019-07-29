import React from 'react';
import CuerpoObjetivosMandos from '../../components/Mandos/CuerpoObjetivosMandos.js';
import {Chart} from 'react-google-charts';
import Loader from '../../components/Generales/Loader.js';
import {Helmet} from 'react-helmet'
import DecodificaMalos from '../../components/Generales/DecodificaMalos.js';
import VariablesMando from '../../components/Mandos/VariablesMando.js';
import MandoDatos from '../../components/Mandos/MandoDatos.js';
import CambiarEtapas from '../../components/Mandos/CambiarEtapas.js';
export default class MandosProfile extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data:MandoDatos(),
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
        let nombreDeVariableUno = DecodificaMalos(this.state.data.variables[0].nombre);
        let nombreDeVariableDos = DecodificaMalos(this.state.data.variables[1].nombre);
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
    // Se encargara de los cambios generales. En si de los datos del indicador
    handleChangeGeneral = e =>{
        let nombre = e.target.name;
        let valor = e.target.value;
        this.setState({
            data:{
                ...this.state.data,
                datos:{
                    ...this.state.data.datos,
                    [nombre] : valor
                }
            }
        })
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
        let descripcion;
        if(this.state.data.objetivosData.descripcion.length === 0){
            descripcion = this.state.data.objetivosData.titulo;
        }else{
            descripcion = this.state.data.objetivosData.descripcion;
        }
        descripcion = DecodificaMalos(descripcion);
        return (
            <React.Fragment>
                <Helmet>
                    <title>Indicadores - {this.state.data.objetivosData.titulo}</title>
                </Helmet>
                <div className="col-12 d-flex justify-content-center">
                    <CuerpoObjetivosMandos 
                    textSuccess="Guardar" 
                    url="" 
                    titulo={DecodificaMalos(this.state.data.datos.titulo)}
                    subtitulo={DecodificaMalos(this.state.data.objetivosData.titulo)} 
                    descripcion={descripcion}
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
                        <div className="col-12 m-0 mt-3 p-1">
                            
                        </div>
                        <div className="col-12 p-2 mando-control">
                            <VariablesMando 
                                onChange={
                                    e=>{
                                         CambiarEtapas(e,this,this.state.data.variables,this.state.data)
                                         this.datosParaChart()
                                         }
                                } etapa={this.state.data.datos.tipoDeEtapa} editar={this.state.editar} variables={this.state.data.variables} porcentaje={porcentaje}/>
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
                                        <label htmlFor="maximaEscala">Escala máxima</label>
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
                            title: DecodificaMalos(this.state.data.datos.titulo),
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
                                title: DecodificaMalos(this.state.data.datos.unidadDeMedida),
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