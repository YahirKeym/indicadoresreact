import React from 'react';
import FormularioPaises from '../components/FormularioPaises.js';
// import {Link} from 'react-router-dom';
class PaisesAdd extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            edit: {
                nombre: '',
                prefijo: ''
            }
        }
    }
    handleChange = e =>
    {
        this.setState({
            edit: {
                ...this.state.edit,
                [e.target.name] : e.target.value 
            }
        });
    }
    /**
     * Nos ayudara a crear el pais
     */
    handleCreate = async e => {
        e.preventDefault();
        const datos = JSON.stringify(this.state.edit);
        const response = await fetch(`${this.props.url}&action=add&data=${datos}`);
        const data = await response.json();
        if(data.status)
        {
            this.props.history.push("/paises");
        }

    }
    /**
     * Regresara al usuario a la página de páises
     */
    handleBack = e =>
    {
        e.preventDefault();
        this.props.history.push("/paises")
    }
    render() 
    {
        return(
            <FormularioPaises handleChange={this.handleChange} handleBack={this.handleBack} state={this.state} textAction="Agregar" onAction={this.handleCreate}/>
        );
    }
}
export default PaisesAdd;