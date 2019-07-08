import React from 'react';
import {Link} from 'react-router-dom';
import ObjetivosVista from '../components/ObjetivosVista.js';
import Loader from '../components/Loader.js';

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
        console.log(this.props)
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
            const response = await fetch(`${this.props.urlObjetivos}&action=view`);
            const datos = await response.json();
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
        const ObjetivoId = e.target.getAttribute("name");
        const $valores = document.querySelectorAll(`#${ObjetivoId} [value]`);
        $valores.forEach(($Elementos) =>
        {
            const elemento = $Elementos.getAttribute("name");
            const valor = $Elementos.getAttribute("value");
            console.log(elemento+" / "+valor);
        });
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
                <div className="col-md-8 col-sm-12 mx-auto">
                    <Link className="btn btn-success col-12" to="/objetivos/add">Añadir Objetivo</Link>
                </div>
                <ObjetivosVista data={this.state.data} textButton="Editar" onClick={this.handleEditar}/>
            </div>
        );
    }
}
export default Objetivos;