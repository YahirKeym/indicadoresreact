import React from 'react';
import FormularioObjetivos from '../components/FormularioObjetivos';

class ObjetivosEdit extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loading: true,
            datos:{
                id: 0,
                titulo: 'Titulo a editar',
                descripcion: 'Descripcion a editar',
                inicia: '1999-05-11',
                finaliza: '1999-05-11',
                iniciativa: '0',
            }
        }
    }
    componentDidMount()
    {
        this.fetchData();
    }
    handleChange = (e) => 
    {
        this.setState(
            {
                datos: {
                    ...this.state.datos,
                    [e.target.name] : e.target.value,
                }
            }
        )
    }
    /**
     * Nos traera los primeros datos del objetivo
     */
    fetchData = async () =>
    {
        const response = await fetch(`${this.props.urlObjetivos}&action=select&id=${this.props.match.params.objetivoId}`);
        const data = await response.json();
        if(data.status)
        {
            this.setState({
                datos: data.datos
            })
        }else{
            this.props.history.push('/objetivos');
        }
    }
    /**
     * Nos ayudara a renderizar el componente
     */
    render()
    {
        return (<FormularioObjetivos successButton="Editar" onChange={this.handleChange} back={this.handleBack} onClick={this.handleSubmit} formulario={this.state.datos}/>);
    }
}
export default ObjetivosEdit;