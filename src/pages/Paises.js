import React from 'react';
import {Link} from 'react-router-dom';
import './styles/Paises.css';
import Loader from '../components/Loader.js';
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
            data: []
        }
    }
    /**
     * Nos ayudara  a mandar a llamar las funciones para poder inicializar nuestro componente
     */
    componentDidMount()
    {
            this.obtenerPaises();
    }
    
    /**
     * Ayuda a obtener todos los paises
     */
    obtenerPaises = async () => {
        const response = await fetch(`${this.props.url}&action=view`);
        const data = await response.json();
        this.setState(
            {
                loading: false,
                data: data.datos
            }
        );
    }
    handleOpenModal = e =>
    {
        e.preventDefault();
        this.setState({
            modal:true,
        })
    }
    handleCloseModal = e =>
    {
        e.preventDefault();
        this.setState({
            modal:false
        })
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
        return(
            <React.Fragment>
                <div className="col-12 rows">
                    <Link to="/paises/add" className="btn btn-success">Agregar un pais</Link>
                </div>
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