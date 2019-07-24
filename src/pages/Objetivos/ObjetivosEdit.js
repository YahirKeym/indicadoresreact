import React from 'react';
import FormularioObjetivos from '../../components/FormularioObjetivos';

class ObjetivosEdit extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loading: true,
            datos:{},
            paises: [],
            alcance: [],
        }
    }
    componentDidMount()
    {
        this.traeDatos();
    }
    traeDatos = async () => {
        const [alcances, paises,objetivo] = await Promise.all([
            fetch(`${this.props.urlAlcance}&action=view`),
            fetch(`${this.props.urlPais}&action=view`),
            fetch(`${this.props.url}&action=select&id=${this.props.match.params.objetivoId}`)
        ])
        const responseAlcances = await alcances.json();
        const responsePaises = await paises.json();
        const responseObjetivo = await objetivo.json();
        if(responseAlcances.status && responsePaises && responseObjetivo.status)
        {
            this.setState({
                loading: false,
                alcance: responseAlcances.datos,
                paises: responsePaises.datos,
                datos: responseObjetivo.datos
            })
        }
    }
    /**
     * Se encargara de editar el objetivo
     */
    handleSubmit = async e => {
        e.preventDefault();
        const jsonEnviar = JSON.stringify(this.state.datos);
        const response = await fetch(
            `${this.props.url}&action=edit&data=${jsonEnviar}`
        );
        const respuesta = await response.json();
        if (respuesta.status) {
            this.props.history.push("/objetivos");
        }
    };
    /**
     * 
     */
    handleChange = e => {
        this.setState({
            datos: {
                ...this.state.datos,
                [e.target.name]: e.target.value
            }
        });
    };
    /**
     * Nos ayudara a regresar a la página de objetivos
     */
    handleBack = e => 
    {
        e.preventDefault();
        this.props.history.push("/objetivos");
    }
    /**
     * Nos ayudara a renderizar el componente
     */
    render()
    {
        const Delete = {
            url: this.props.url,
            id: this.state.datos.id,
            history: this.props.history,
            oneProfile: true,
        }
        return (
        <FormularioObjetivos 
        edit="true" 
        successButton="Editar"
        onChange={this.handleChange}
        back={this.handleBack}
        onClick={this.handleSubmit}
        formulario={this.state}
        Delete={Delete} />);
    }
}
export default ObjetivosEdit;