import React from 'react';
import {Link} from 'react-router-dom';
import './styles/Paises.css';
import Loader from '../../components/Loader.js';
import ButtonDirectTop from '../../components/ButtonDirectTop';
import ErrorConexion from '../../components/ErrorConexion';
import SinDatos from '../../components/SinDatos';
import TraeDatos from '../../components/TraeDatos';
class Paises extends React.Component
{
    /**
     * Inicializaremos el estado
     * @param {*} props 
     */
    constructor(props)
    {
        super(props);
        this.state={
            modal: false,
            loading:true,
            data: [],
            error:false
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
     * Ayuda a obtener todos los paises
     */
    obtenerPaises = async () => {
        try{
            const response = await fetch(`${this.props.url}&action=view`);
            const data = await response.json();
            this.setState(
                {
                    loading: false,
                    data: data.datos,
                    error: false
                }
            );
        }catch(error){
            this.setState({
                error: true,
                loading:false
            })
        }
    }
    /**
     * Nos ayudara a renderizar los paises y su editable
     */
    render()
    {
        if(this.state.loading){
            return(
                <Loader />
            );
        }
        if(this.state.error){
            return(
                <ErrorConexion />
            )
        }
        if(this.state.data.length === 0){
            return(
                <SinDatos />
            )
        }
        return(
            <React.Fragment>
                <ButtonDirectTop to="/paises/add" text="Añadir un pais" />
                <div className="col-12 row mt-3">
                    {this.state.data.map(pais=>{
                        return(<div className="col-md-3 col-6 pais mb-2" key={pais.id}>
                            <p>
                                <span className="bg-primary p-1 text-white">{pais.nombre}</span>
                                <span className="ml-2">
                                    <Link to={`/paises/${pais.id}/edit`} onClick={this.obtenerOnePais}>Editar</Link>
                                </span>
                                <span className="ml-2">
                                    <Link to={`/paises/${pais.id}/delete`}>Eliminar</Link>
                                </span>
                                </p>
                        </div>);
                    })}
                </div>
            </React.Fragment>
        );
    }
}
export default Paises;