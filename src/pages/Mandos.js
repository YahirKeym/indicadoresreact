import React from 'react';
import {Link} from 'react-router-dom';
import CuerpoObjetivosMandos from '../components/CuerpoObjetivosMandos.js';
import ButtonDirectTop from '../components/ButtonDirectTop.js';
import DeleteAction from '../components/DeleteAction.js';

/**
 * Guardara los badges de Jerarquias
 * @param {*} props 
 */
function JerarquiasMando(props)
{
    let jerarquias = props.jerarquias;
    let rangos = props.rangos;
    return(
        <React.Fragment>
            {jerarquias.datos.map(rangoMando=>{
            return(
                <React.Fragment key={rangoMando.id}>
                    {rangos.map(rango => {
                        let Element = <span key={rango.id}></span>;
                        if(rangoMando.id === rango.id){
                            Element = <span key={rango.id} className="badge badge-light mt-3 mr-3">{rango.nombre}</span>;
                        }
                        return(
                            Element
                        );
                    })}
                </React.Fragment>
                )
            })}
        </React.Fragment>
    )
}
/**
 * Guardara el componente de las variables del mando
 * @param {propiedades} props 
 */
function VariablesMando(props)
{
    const variables = props.variables;
    const {porcentajeBueno, porcentajeMedio} = props.porcentaje;
    const tipoDeEtapa = props.etapa;
    return(
        <React.Fragment>
            {variables.map(variable =>{
                return(
                    <div className="col-12 row variable" key={variable.id}>
                        <div className="col-9">
                            <span style={{fontWeight:700}}>{quitaEspeciales(variable.nombre)}</span> <span className="float-right"><span style={{fontWeight:700}}>Tipo de etapa:</span> {tipoDeEtapa}</span>
                        </div>
                        <div className="col-md-10 col-12 row">

                            {variable.etapas.map(nombreEtapa => {
                                if(variable.id === 1)
                                {
                                    return(
                                        <div className="col-md-1 d-none d-md-block font-weight-bold text-center" key={nombreEtapa.id}>
                                            {nombreEtapa.nombreEtapa}
                                        </div>
                                    )
                                }
                                return ;
                            })}
                            {variable.etapas.map(etapa =>{
                                let color = "";
                                if(etapa.porcentaje < porcentajeBueno)
                                {
                                    color = "bg-warning";
                                }
                                if(etapa.porcentaje < porcentajeMedio)
                                {
                                    color ="bg-danger"
                                }
                                let valor = Math.round(etapa.porcentaje);
                                return(
                                    <div className={`col-md-1 col-3 text-center etapa ${color}`} key={etapa.id}>
                                        {`${valor}%`}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col-md-2 col-12 text-center">
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
/**
 * Será la clase de mandos donde se visualizaran todos
 */
class Mandos extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data:[],
            objetivos:[]
        }
    }
    componentDidMount()
    {
        this.traerDatos();
    }
    /**
     * Tr
     */
    traerDatos = async () =>{
        const req = await fetch(`${this.props.url}&action=view`);
        const response =  await req.json();
        if(response.status)
        {
            if(response.datos.length === 0){
                response.datos = [];
            }
            this.setState({
                data: response.datos
            })
        }
    } 
    render()
    {
        return (
            <React.Fragment>
                <div className="col-12 mt-3 row">
                    <ButtonDirectTop to="/mandos/add" text="Añadir nuevo mando" />
                    <div className="col-12 row d-flex justify-content-between">
                        {this.state.data.map(mando => {
                            const porcentaje = {
                                porcentajeBueno: mando.datos.AceptacionBuena,
                                porcentajeMedio: mando.datos.AceptacionMedia
                            }
                            let titulo = mando.datos.titulo;
                            if(titulo.length === 0){
                                titulo = mando.objetivosData.titulo;
                            }
                            return(
                                <div className="mando col-12 text-white p-3" key={mando.id}>
                                    <h4>{titulo}</h4>
                                    <div className="col-12 p-2 mando-control">
                                        <VariablesMando variables={mando.variables} porcentaje={porcentaje} etapa={mando.datos.tipoDeEtapa}/>
                                    </div>
                                    <div className="col-12">
                                        <JerarquiasMando jerarquias={mando.datos.jerarquias} rangos={mando.rangos}/>
                                    </div>
                                    <div className="col-12 mt-2">
                                        <Link className="btn btn-success" to={`/mandos/${mando.id}`}>Ver</Link>
                                        <DeleteAction 
                                        url={this.props.url} 
                                        id={mando.id} 
                                        oneProfile={false}  
                                        history={this.props.history} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Mandos;