import React from "react";
import Loader from "../../components/Generales/Loader.js";
import { Redirect } from "react-router-dom";
import FormularioObjetivos from '../../components/FormularioObjetivos';
class ObjetivosAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            datos: {
                titulo: "",
                descripcion: "",
                tipoAlcance: 0,
                paisAlcance:0,
                paisIniciativa: 0,
                inicia: "2019-05-11",
                finaliza: "2019-12-31"
            },
            paises: [],
            alcance:[],
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
        this.traeDatos();
    }
    traeDatos = async () => {
        const [alcances, paises] = await Promise.all([
            fetch(`${this.props.urlAlcance}&action=view`),
            fetch(`${this.props.urlPais}&action=view`)
        ])
        const responseAlcances = await alcances.json();
        const responsePaises = await paises.json();
        if(responseAlcances.status && responsePaises)
        {
            this.setState({
                loading: false,
                alcance: responseAlcances.datos,
                paises: responsePaises.datos
            })
        }
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
            `${this.props.url}&action=add&data=${jsonEnviar}`
        );
        const respuesta = await response.json();
        if (respuesta.status) {
            this.setState({
                redirect: true
            });
        }
    };
    /**
     * 
     */
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
        return (<FormularioObjetivos onChange={this.handleChange} formulario={this.state} back={this.handleBack} onClick={this.handleSubmit} successButton="Agregar" />);
    }
}
export default ObjetivosAdd;
