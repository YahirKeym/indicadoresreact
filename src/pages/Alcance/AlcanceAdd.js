import React from 'react';
import './styles/AlcanceAdd.css';
import FormularioAlcance from '../../components/FormularioAlcance.js';
class AlcanceAdd extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            empty : false,
            data :{
                nombre: '',
                nombreinterno: ''
            },
            repetido: false,
            nombre : '',
        }
    }
    /**
     * Nos ayudara a guardar los inputs
     */
    handleChange = (e) => 
    {
        this.setState(
            {
                data: {
                    ...this.state.data,
                    [e.target.name] : e.target.value
                }
            }
        );
    }
    /**
     * Nos ayudara a enviar los datos del alcance
     */
    handleAdd = async (e) =>
    {
        e.preventDefault();
        const cDatos = JSON.stringify(this.state.data);
        const response = await fetch(`${this.props.url}&action=add&data=${cDatos}`);
        const data = await response.json();
        if(data.empty)
        {
            this.setState({
                empty: true
            });
        }
        if(data.repetido)
        {
            this.setState({
                empty: false,
                repetido: true,
                nombre: data.nombre
            })
        }
        if(data.status && !data.empty)
        {
            this.props.history.push("/tipos/alcance");
        }
        
    }
    /**
     * Nos ayudara a regresar a la página de alcance.
     */
    handleBack = (e) =>
    {
        e.preventDefault();
        this.props.history.push("/tipos/alcance");
    }
    /**
     * Renderizara el componente de formulario
     */
    render()
    {
        return (
            <FormularioAlcance state={this.state} onClick={this.handleAdd} handleBack={this.handleBack} textAction="Agregar" onChange={this.handleChange} />
        );
    }
}
export default AlcanceAdd;