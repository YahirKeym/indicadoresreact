import React from 'react';
import {Link} from 'react-router-dom';
import './styles/Mandos.css';
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
    traerDatos = async () =>{
        const req = await fetch(`${this.props.url}&action=view`);
        const response =  await req.json();
        const reqObjetivos = await fetch(`${this.props.urlObjetivos}&action=view`);
        const responseObjetivos = await reqObjetivos.json();
        if(response.status && responseObjetivos.status)
        {
            if(response.datos.length === 0){
                response.datos = [];
            }
            this.setState({
                data: response.datos,
                objetivos: responseObjetivos.datos
            })
        }
    } 
    render()
    {
        return (
            <React.Fragment>
                <Link to="/mandos/add" className="btn btn-success">Añadir nuevo mando</Link>
                <div className="col-12 mt-3 row">
                    {this.state.data.map(mando => {
                        return(
                            <div className="col-12 p-3 col-md-6 row mando mx-auto text-white" key={mando.id}>
                                {this.state.objetivos.map(objetivo => {
                                    if(mando.datos.objetivo === objetivo.id){
                                        return(
                                            <React.Fragment key={objetivo.id}>
                                                <div  className="col-12 text-center">
                                                    <h4>{objetivo.titulo}</h4>
                                                </div>
                                                <div className="col-12 p-2 mando-text">
                                                    <p>{objetivo.descripcion}</p>
                                                </div>
                                                <div className="col-12 p-2 mando-control">
                                                {mando.variables.map(variable =>{
                                                    return(
                                                        <div className="col-12 row variable" key={variable.id}>
                                                            <div className="col-12">
                                                                {variable.nombre}
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
                                                </div>
                                            </React.Fragment>
                                        )
                                    }
                                    return(
                                        <span key={objetivo.id}></span>
                                    );
                                })}
                                <div className="col-12">
                                    {mando.datos.rangos.map(rangoMando=>{
                                        return(
                                            <React.Fragment key={rangoMando.id}>
                                                {mando.rangos.map(rango => {
                                                    var Element = <span key={rango.id}></span>;
                                                    if(rangoMando.id === rango.id){
                                                       Element = <span key={rango.id} className="badge badge-light mt-3 mb-3 mr-3">{rango.nombre}</span>;
                                                        }
                                                        return(
                                                            Element
                                                            );
                                                        })}
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                                <div className="col-12">
                                    <Link className="btn btn-success" to={`/mandos/${mando.id}`}>Ver</Link>
                                    <button className="btn btn-danger ml-3">Eliminar</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </React.Fragment>
        );
    }
}
export default Mandos;