import React from 'react';
import {Link} from 'react-router-dom';
import CuerpoObjetivosMandos from '../components/CuerpoObjetivosMandos.js';
import Loader from '../components/Loader.js';
import ButtonDirectTop from '../components/ButtonDirectTop.js';

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
        this.handleEditar = this.handleEditar.bind(this);
    }
    /**
     * Nos ayudara a montar el componente
     */
    componentDidMount()
    {
        this.traeObjetivos();
    }
    /**
     * 
     */
    traeObjetivos = async () => 
    {
        try {
            const response = await fetch(`${this.props.url}&action=view`);
            const datos = await response.json();
            if(datos.datos === undefined)
            {
                datos.datos = [];
            }
            this.setState(
                {
                    loading: false,
                    data: datos.datos
                }
            );
        } catch (error) {
            this.setState({
                loading:false,
                data: [],
                error: true
            });
        }
    }
    /**
     * Nos ayudara a desmontar el componente
     */
    componentWillUnmount()
    {
       
    }
    handleEditar(e)
    {
        this.setState(
            { 
                editar: true,
                error: null,
                data: [
                    ...this.state.data,
                ]
            }
            );
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
            <div className="col-12">
                Por favor vuelve a intentarlo más tarde.
            </div>
            );
        }
        return (
            <div className="col-12 row">
                <ButtonDirectTop to="/objetivos/add" text="Añadir objetivo" />
                <div className="col-12 row">
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