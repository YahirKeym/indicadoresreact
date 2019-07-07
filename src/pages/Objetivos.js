import React from 'react';
import ObjetivosVista from '../components/ObjetivosVista.js';
import { async } from 'q';
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
            data: []
        };
        return console.log("hola")
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
        const response = await fetch('../api/controller/objetivos.php?action=view');
        const datos = await response.json();
        this.setState(
            {
                data: datos
            }
        );
    }
    /**
     * Nos ayudara a desmontar el componente
     */
    componentWillUnmount()
    {
        console.log("me desmonte")
        clearTimeout(this.llamaObjetivos);
    }
    /**
     * Renderizara el componente
     */
    render()
    {
        return (
            <div>
                <ObjetivosVista data={this.state.data}/>
            </div>
        );
    }
}
export default Objetivos;