import React from 'react';
import FormularioPaises from '../../components/FormularioPaises.js';
class PaisesEdit extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            edit:{
                nombre:'',
                prefijo:''
            },
            error: false
        }
    }
    /**
     * Nos ayudara a montar el componente con los datos del país
     */
    componentDidMount()
    {
        this.obtenerOnePais();
    }
    /**
     * Ayudara a obtener un solo pais para poderlo editar
     */
    obtenerOnePais = async () => {
        const response = await fetch(`${this.props.url}&action=select&id=${this.props.match.params.paisId}`);
        const data = await response.json();
        this.setState({
            edit: data.data
        })
    }
    /**
     * Nos ayudara a enviar los datos de actualización
     */
    handleEdit = async e => {
        e.preventDefault();
        const datos = JSON.stringify(this.state.edit);
        const response = await fetch(`${this.props.url}&action=edit&data=${datos}`);
        const data = await response.json();
        if(!data.status)
        {
            this.setState({
                error: true
            });
        }else{
            this.props.history.push("/paises")
        }
    }
    /**
     * Regresara a la página de paises
     */
    handleBack = e => 
    {
        e.preventDefault();
        this.props.history.push("/paises")
    }
    /**
     * Nos ayudara a guardar el estado de la edición
     */
    handleChange = e => {
        this.setState({
            edit: {
                ...this.state.edit,
                [e.target.name] : e.target.value,
            }
        })
    }
    render()
    {
        return (
            <React.Fragment>
                <FormularioPaises handleChange={this.handleChange} handleBack={this.handleBack} state={this.state} textAction="Editar" onAction={this.handleEdit}/>
            </React.Fragment>
        );
    }
}
export default PaisesEdit;