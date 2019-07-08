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
            const response = await fetch('http://localhost/indicadores/api/controller/objetivos.php?action=view');
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
                    {
                        id: 2,
                        titulo: "hola"
                    }
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
            <div className="col-12">
                <Link className="btn btn-success" to="/objetivos/add">Añadir Objetivo</Link>
                {this.state.editar && (
                <h4>Estas editando</h4>
                )}
                <ObjetivosVista data={this.state.data} textButton="Ver más" onClick={this.handleEditar}/>
            </div>
        );
    }
}
export default Objetivos;