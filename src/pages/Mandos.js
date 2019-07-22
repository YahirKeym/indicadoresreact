import React from 'react';
import {Link} from 'react-router-dom';
import CuerpoObjetivosMandos from '../components/CuerpoObjetivosMandos.js';
import ButtonDirectTop from '../components/ButtonDirectTop.js';

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
                        <div className="col-10 row">
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
                                <div className={`col-2 text-center etapa ${color}`} key={etapa.id}>
                                    {`${valor}%`}
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
                    <div className="col-12 row">
                        {this.state.data.map(mando => {
                            const porcentaje = {
                                porcentajeBueno: mando.datos.AceptacionBuena,
                                porcentajeMedio: mando.datos.AceptacionMedia
                            }
                            return(
                                <CuerpoObjetivosMandos textSuccess="Ver" key={mando.id} 
                                titulo={mando.datos.titulo} id={mando.id} 
                                subtitulo={mando.objetivosData.titulo} url={`/mandos/${mando.id}`} 
                                descripcion={mando.objetivosData.descripcion}
                                Delete={this.props.url}
                                history={this.props.history}
                                id={mando.id}
                                oneProfile={false}>
                                    <div className="col-12 p-2 mando-control">
                                        <VariablesMando variables={mando.variables} porcentaje={porcentaje} etapa={mando.datos.tipoDeEtapa}/>
                                    </div>
                                    <div className="col-12">
                                        <JerarquiasMando jerarquias={mando.datos.jerarquias} rangos={mando.rangos}/>
                                    </div>
                                </CuerpoObjetivosMandos>
                            );
                        })}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Mandos;