import React from 'react';
import {Link} from 'react-router-dom';
import './styles/alcance.css';
import Loader from '../components/Loader.js';
class Alcance extends React.Component{
    constructor(props)
    {
        super(props);
        this.success = false;
        if(this.props.match.params.alcanceAction === "success")
        {
            this.success = true;
        }
        this.state = {
            loader: true,
            success: this.success,
            data: []
        }
    }
    componentDidMount()
    {
        this.traerDatos();
    }
    traerDatos = async () => 
    {
        const response = await fetch(`${this.props.url}&action=view`);
        const data = await response.json();
        this.setState(
            {
                loader:false,
                data:data.datos
            }
        )
    }
    render()
    {
        if(this.state.loader)
        {
            return (
                <Loader />
            );
        }
        return (
           <React.Fragment>
                <div className="row col-12 d-block d-sm-block d-md-flex justify-content-center">
                    <div className="col-md-5 col-12 col-sm-12">
                        <Link className="btn btn-success col-12" to="/tipos/alcance/add">AGREGAR ALCANCE</Link>
                    </div>
                    <div className="col-5"></div>
                    {this.state.success && (
                        <div className="bg-success col-12 col-md-8 mt-3 text-white text-center success p-3">
                            <h4>Alcance agregado correctamente</h4>
                        </div>
                    )}
                </div>    
                <div className="mt-3 row d-block d-sm-block d-md-flex justify-content-center">
                    {this.state.data.map(alcance=>{
                        return (
                            <div key={alcance.id} className="col-md-3 col-11 col-sm-11 bg-header text-white text-center alcance p-3 mt-2 ml-3">
                                <h4>{alcance.nombre}</h4>
                                <Link className="btn btn-editar mr-3" to={`/tipos/alcance/${alcance.id}/edit`}>Editar</Link>
                                <Link className="btn btn-danger mt-1" to={`/tipos/alcance/${alcance.id}/delete`}>Eliminar</Link>
                            </div>
                        );
                    })}
                </div>
           </React.Fragment>
        );
    }
}
export default Alcance;