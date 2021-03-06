import React from 'react';
import './styles/alcance.css';
import ButtonDirectTop from '../../components/Generales/ButtonDirectTop.js';
import Loader from '../../components/Generales/Loader.js';
import ErrorConexion from '../../components/Errores/ErrorConexion';
import TraeDatos from '../../components/TraeDatos.js';
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
            loading: true,
            success: this.success,
            data: [],
            error: false
        }
    }
    /**
     * Nos ayudara  a mandar a llamar las funciones para poder inicializar nuestro componente
     */
    componentDidMount()
    {
        TraeDatos({url: this.props.url, _self: this});
    }
    /**
     * 
     */
    componentWillUnmount(){
        clearTimeout(this.traeDatos)
    }
    /**
     * 
     */
    render()
    {
        if(this.state.loading)
        {
            return (
                <Loader />
            );
        }
        if(this.state.error){
            return(
                <ErrorConexion />
            )
        }
        return (
           <React.Fragment>
                <div className="row col-12 d-block d-sm-block d-md-flex justify-content-center">
                    <ButtonDirectTop to="/tipos/alcance/add" text="Agregar alcance" />
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
                            <div key={alcance.id} className="col-md-3 col-11 col-sm-11 secondary-bg text-white text-center alcance p-3 mt-2 ml-3">
                                <h4>{alcance.nombre}</h4>
                                {/* <Link className="btn btn-editar mr-3" to={`/tipos/alcance/${alcance.id}/edit`}>Editar</Link>
                                <Link className="btn btn-danger mt-1" to={`/tipos/alcance/${alcance.id}/delete`}>Eliminar</Link> */}
                            </div>
                        );
                    })}
                </div>
           </React.Fragment>
        );
    }
}
export default Alcance;