import React from 'react';
import CuerpoObjetivosMandos from '../../components/Mandos/CuerpoObjetivosMandos.js';
import Loader from '../../components/Generales/Loader.js';
import ButtonDirectTop from '../../components/Generales/ButtonDirectTop.js';
import SinDatos from '../../components/Errores/SinDatos.js';
import ErrorConexion from '../../components/Errores/ErrorConexion.js';
import TraeDatos from '../../components/TraeDatos.js';
/**
 * Será la clase que nos ayudara a pintar los objetivos
 */
class Objetivos extends React.Component
{
    /**
     * Iniciara la construcción del componente
     * @param {*} props 
     */
    constructor(props)
    {
        super(props);
        this.state ={
            loading: true,
            data: [],
            error: false,
        };
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
     * Renderizara el componente
     */
    render()
    {
        if(this.state.loading)
        {
            return (
                <Loader />
            );
        }
        if (this.state.error) {
            return (
                <ErrorConexion />
            );
        }
        return (
            <div className="col-12 row">
                <ButtonDirectTop to="/objetivos/add" text="Añadir objetivo" />
                <div className="col-12 row d-flex justify-content-between">
                    {this.state.data.length === 0 && (
                        <SinDatos />
                    )}
                    {this.state.data.map(objetivo => {
                        return(
                            <CuerpoObjetivosMandos titulo={objetivo.titulo} textSuccess="Editar" 
                            url={`/objetivos/${objetivo.id}/edit`} 
                            Delete={this.props.url}
                            descripcion={objetivo.descripcion} 
                            id={objetivo.id}
                            history={this.props.history}
                            key={objetivo.id}>
                                <div className="col-12 mt-3">
                                    <p>Inicia: <span>{objetivo.inicia}</span></p>
                                    <p>Finaliza: <span>{objetivo.finaliza}</span></p>
                                </div>
                            </CuerpoObjetivosMandos>
                        )
                    })}
                </div>
            </div>
        );
    }
}
export default Objetivos;