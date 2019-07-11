import React from 'react';
import "./styles/JerarquiasMove.css";
import Loader from '../components/Loader.js';
export default class JerarquiasMove extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading: true,
            datos: [],
            loadingJerarquia: false
        }
    }
    componentDidMount()
    {
        this.traerJerarquias();
    }
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
        console.log(this.state.datos)

    }
    /**
     * Movera la jerarquia hacía arriba
     */
    handleSum = e => {
        e.preventDefault();
        this.setState({
            loadingJerarquia: true,
        });
        const id = e.target.getAttribute('jerarquia');
        const orden = e.target.getAttribute('orden');
        this.state.datos.map(jerarquia => {
            if(orden -1  === parseInt(jerarquia.orden)){
                jerarquia.orden = parseInt(jerarquia.orden)+1;
            }
            if(id === jerarquia.id)
            {
                if(parseInt(jerarquia.orden) !== 1)
                {
                    jerarquia.orden = parseInt(jerarquia.orden)-1
                }
            }
        });
        this.setState({
            datos: this.state.datos,
        })
        this.enviarPosicion();
    }
    /**
     * Nos ayudara a mover la jerarquia hacía abajo
     */
    handleRest = e => {
        e.preventDefault()
        this.setState({
            loadingJerarquia: true,
        });
        const id = e.target.getAttribute('jerarquia');
        const orden = e.target.getAttribute('orden');
        const cantidadDeDatos = this.state.datos.length;
        this.state.datos.map(jerarquia => {
            if(parseInt(orden)+1  === parseInt(jerarquia.orden)){
                jerarquia.orden = parseInt(jerarquia.orden)-1;
            }
            if(id === jerarquia.id)
            {
                if(parseInt(jerarquia.orden) !== cantidadDeDatos)
                {
                    jerarquia.orden = parseInt(jerarquia.orden)+1
                }
            }
        });
        this.setState({
            datos: this.state.datos,
        })
        this.enviarPosicion();
    }
    enviarPosicion = async () => {
        const datos = JSON.stringify(this.state.datos);
        const req = await fetch(`${this.props.url}&action=updatemove&data=${datos}`);
        const response = await req.json();
        if(response.status)
        {
            this.setState({
                loadingJerarquia:false
            });
        }
    }
    render()
    {
        if(this.state.loading){
            return(
                <Loader />
            );
        }
        this.state.datos.sort((a,b)=>{
            return a.orden - b.orden;
        })
        return(
            <div className="row">
                {this.state.datos.map(jerarquia=>{
                    return(
                        <div className="col-12 p-3 jerarquia text-center" key={jerarquia.id}>
                            {this.state.loadingJerarquia && (
                            <button className="btn btn-success" disabled>+</button>
                            )}
                            {!this.state.loadingJerarquia && (

                                <button className="btn btn-success" jerarquia={jerarquia.id} orden={jerarquia.orden} onClick={this.handleSum}>+</button>
                            )}
                            <h3>{jerarquia.nombre}</h3>
                            {this.state.loadingJerarquia && (
                            <button className="btn btn-danger" disabled>-</button>
                            )}
                            {!this.state.loadingJerarquia && (

                                <button className="btn btn-danger" onClick={this.handleRest} jerarquia={jerarquia.id} orden={jerarquia.orden}>-</button>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
}