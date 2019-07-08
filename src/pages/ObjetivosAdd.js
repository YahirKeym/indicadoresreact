import React from "react";
import Loader from "../components/Loader.js";
import { Redirect } from "react-router-dom";
import FormularioObjetivos from '../components/FormularioObjetivos';
class ObjetivosAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            datos: {
                titulo: "",
                descripcion: "",
                tipoAlcance: "",
                paisAlcance: "",
                paisIniciativa: "",
                inicia: "",
                finaliza: ""
            },
            validarCampos: {
                titulo: true,
                descripcion: true,
                tipoAlcance: true,
                paisAlcance: true,
                paisIniciativa: true,
                inicia: true,
                finaliza: true
            },
            redirect: false
        };
    }
    /**
     * Nos ayudara a montar el componente
     */
    componentDidMount() {
        this.setState({
            loading: false
        });
    }
    /**
     * Guardara los datos del formulario
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
     * Se encargara de agegar el objetivo
     */
    handleSubmit = async e => {
        e.preventDefault();
        const jsonEnviar = JSON.stringify(this.state.datos);
        const response = await fetch(
            `${this.props.urlObjetivos}&action=add&data=${jsonEnviar}`
        );
        const respuesta = await response.json();
        if (respuesta.status) {
            this.setState({
                redirect: true
            });
        }
    };
    handleBack = e => {
        e.preventDefault();
        this.setState({
            redirect: true
        });
    };
    /**
     * Nos renderizara el formulario
     */
    render() {
        if (this.state.loading) {
            return <Loader />;
        }
        if (this.state.redirect) {
            return <Redirect to="/objetivos" />;
        }
        return (<FormularioObjetivos onChange={this.handleChange} back={this.handleBack} onClick={this.handleSubmit} successButton="Agregar" />);
    }
}
export default ObjetivosAdd;
