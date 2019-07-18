import React from 'react';
import {Link} from 'react-router-dom';
import CuerpoObjetivosMandos from '../components/CuerpoObjetivosMandos.js';

/**
 * Guardara los badges de Jerarquias
 * @param {*} props 
 */
function JerarquiasMando(props)
{
    let jerarquias = props.jerarquias;
    console.log(jerarquias)
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
        console.log(this.state)
        return (
            <React.Fragment>
                <div className="col-12 mt-3 row">
                    <div className="col-5 mb-3 mx-auto">
                        <Link to="/mandos/add" className="btn btn-success col-12">Añadir nuevo mando</Link>
                    </div>
                    <div className="col-12 row">
                        {this.state.data.map(mando => {
                            return(
                                <CuerpoObjetivosMandos textSuccess="Ver" key={mando.id} 
                                titulo={mando.datos.titulo} id={mando.id} 
                                subtitulo={mando.objetivosData.titulo} url={`/mandos/${mando.id}`} 
                                descripcion={mando.objetivosData.descripcion}
                                delete={`/mandos/${mando.id}/delete`}>
                                    <div className="col-12 p-2 mando-control">
                                        <VariablesMando variables={mando.variables} />
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