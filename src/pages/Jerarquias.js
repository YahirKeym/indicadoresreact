import React from 'react';
import {Link} from 'react-router-dom';
import "./styles/Jerarquias.css";
import Loader from '../components/Loader.js';
export default class Jerarquias extends React.Component{
    constructor(props)
    {
        super(props);
        this.state ={
            loading: true,
            datos:[],
            rangos:[]
        }
    }
    componentDidMount()
    {
        this.traerJerarquias();
        this.traerRangos();
    }
    /**
     * traera todas las jerarquias disponibles
     */
    traerJerarquias = async () => {
        const req = await fetch(`${this.props.url}&action=view`);
        const response = await req.json();
        if(response.status)
        {
            this.setState({
                loading: false,
                datos: response.datos
            })
        }
    }
    traerRangos = async () => 
    {
        const req = await fetch(`${this.props.urlRango}&action=view`);
        const response = await req.json();
        if(response.status)
        {
            this.setState({
                loading: false,
                rangos: response.datos
            })
        }  
    }
    render()
    {
        if(this.state.loading){
           return( <Loader />);
        }
        return(
            <div>
                <div className="col-12 row">
                    <div className="col-12 row mb-3">
                        <div className="col-4">
                            <Link to="/jerarquia/rango/add" className="btn btn-success">Agregar Encargado</Link>
                        </div>
                        <div className="col-4">
                            <Link to="/jerarquia/add" className="btn btn-success">Agregar Jerarquia</Link>
                        </div>
                        <div className="col-4">
                            <Link to="/jerarquia/move" className="btn btn-success">Mover Jerarquias</Link>
                        </div>
                    </div>
                    {this.state.datos.map(jerarquia=>{
                            return(
                            <div className="col-12 row p-2 jerarquia d-flex justify-content-center text-center" key={jerarquia.id}>
                                <div className="col-12">
                                    <h4>{jerarquia.nombre}</h4>
                                    {this.state.rangos.map(rango=>{
                                        if(jerarquia.id === rango.idJerarquia){

                                            return(
                                                <div className="bg-primary col-3 rank mx-auto p-3 text-white" key={rango.id}>
                                                    {rango.nombre}
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                            )
                    })} 
                </div>
            </div>
        );
    }
}