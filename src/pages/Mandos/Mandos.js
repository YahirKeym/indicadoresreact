import React from "react";
import { Link } from "react-router-dom";
import ButtonDirectTop from "../../components/Generales/ButtonDirectTop.js";
import DeleteAction from "../../components/DeleteAction.js";
import { Helmet } from "react-helmet";
import Loader from "../../components/Loader.js";
import ErrorConexion from "../../components/ErrorConexion.js";
import SinDatos from "../../components/SinDatos.js";
import TraeDatos from "../../components/TraeDatos.js";
import BuscadorIncremental from "../../components/BuscadorIncremental.js";
/**
 * Guardara los badges de Jerarquias
 * @param {*} props
 */
function JerarquiasMando(props) {
    let jerarquias = props.jerarquias;
    let rangos = props.rangos;
    return (
        <React.Fragment>
            {jerarquias.datos.map(rangoMando => {
                return (
                    <React.Fragment key={rangoMando.id}>
                        {rangos.map(rango => {
                            let Element = <span key={rango.id} />;
                            if (rangoMando.id === rango.id) {
                                Element = (
                                    <span
                                        key={rango.id}
                                        className="badge badge-light mt-3 mr-3"
                                    >
                                        {rango.nombre}
                                    </span>
                                );
                            }
                            return Element;
                        })}
                    </React.Fragment>
                );
            })}
        </React.Fragment>
    );
}
/**
 * Guardara el componente de las variables del mando
 * @param {propiedades} props
 */
function VariablesMando(props) {
    const variables = props.variables;
    const { porcentajeBueno, porcentajeMedio } = props.porcentaje;
    const tipoDeEtapa = props.etapa;
    return (
        <React.Fragment>
            {variables.map(variable => {
                return (
                    <div className="col-12 row variable" key={variable.id}>
                        <div className="col-9">
                            <span style={{ fontWeight: 700 }}>
                                {quitaEspeciales(variable.nombre)}
                            </span>{" "}
                            <span className="float-right">
                                <span style={{ fontWeight: 700 }}>
                                    Tipo de etapa:
                                </span>{" "}
                                {tipoDeEtapa}
                            </span>
                        </div>
                        <div className="col-md-10 col-12 row">
                            {variable.etapas.map(nombreEtapa => {
                                if (variable.id === 1) {
                                    return (
                                        <div
                                            className="col-md-1 d-none d-md-block font-weight-bold text-center"
                                            key={nombreEtapa.id}
                                        >
                                            {nombreEtapa.nombreEtapa}
                                        </div>
                                    );
                                }
                                return;
                            })}
                            {variable.etapas.map(etapa => {
                                let color = "";
                                if (etapa.porcentaje < porcentajeBueno) {
                                    color = "bg-warning";
                                }
                                if (etapa.porcentaje < porcentajeMedio) {
                                    color = "bg-danger";
                                }
                                let valor = Math.round(etapa.porcentaje);
                                return (
                                    <div
                                        className={`col-md-1 col-3 text-center etapa ${color}`}
                                        key={etapa.id}
                                    >
                                        {`${valor}%`}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="col-md-2 col-12 text-center">
                            Total: {Math.round(variable.valorTotal * 100) / 100}
                        </div>
                    </div>
                );
            })}
        </React.Fragment>
    );
}
/**
 * Quita caracteres especiales
 */
function quitaEspeciales(cadena = "") {
    cadena = cadena.replace(/_/gi, " ");
    return cadena;
}
/**
 * Cambiara los acentos que vengan con codificación java
 */
function acentosEncodeJava(cadena = "") {
    cadena = cadena.replace(/u00e1/gi, "á");
    cadena = cadena.replace(/u00C1/gi, "Á");
    cadena = cadena.replace(/u00E9/gi, "é");
    cadena = cadena.replace(/u00C9/gi, "É");
    cadena = cadena.replace(/u00ED/gi, "í");
    cadena = cadena.replace(/u00CD/gi, "Í");
    cadena = cadena.replace(/u00f3/gi, "ó");
    cadena = cadena.replace(/u00D3/gi, "Ó");
    cadena = cadena.replace(/u00fa/gi, "ú");
    cadena = cadena.replace(/u00DA/gi, "Ú");
    cadena = cadena.replace(/u00F1/gi, "ñ");
    cadena = cadena.replace(/u00D1/gi, "Ñ");
    return cadena;
}
/**
 * Será la clase de mandos donde se visualizaran todos
 */
class Mandos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            objetivos: [],
            loading: true,
            error: false
        };
    }
    /**
     * Nos ayudara  a mandar a llamar las funciones para poder inicializar nuestro componente
     */
    componentDidMount() {
        TraeDatos({ url: this.props.url, _self: this });
    }
    /**
     *
     */
    componentWillUnmount() {
        clearTimeout(this.traeDatos);
        clearTimeout(this.buscadorTime);
    }
    render() {
        if (this.state.loading) {
            return <Loader />;
        }
        if (this.state.error) {
            return <ErrorConexion />;
        }
        if (this.state.data.length === 0) {
            return <SinDatos />;
        }
        this.buscadorTime = setTimeout(()=>{BuscadorIncremental({claseCorrecta: "d-block",claseIncorrecta:"d-none",buscador: "buscaMandos",seBusca:"mandos"})},1000);
        return (
            <React.Fragment>
                <Helmet>
                    <title>Indicadores - Indicadores</title>
                </Helmet>
                <div className="col-12 row">
                    <ButtonDirectTop to="/mandos/add" text="Añadir nuevo mando" />
                    <div className="col-12">
                        <input name="buscaMandos" type="text" className="form-control mb-3 col-6" placeholder="Buscar indicador" />
                    </div>
                    <div
                        className="col-12 row d-flex justify-content-between"
                        search-name="mandos"
                    >
                        {this.state.data.map(mando => {
                            const porcentaje = {
                                porcentajeBueno: mando.datos.AceptacionBuena,
                                porcentajeMedio: mando.datos.AceptacionMedia
                            };
                            let titulo = acentosEncodeJava(mando.datos.titulo);
                            if (titulo.length === 0) {
                                titulo = acentosEncodeJava(
                                    mando.objetivosData.titulo
                                );
                            }
                            return (
                                <div
                                    className="mando col-12 text-white p-3"
                                    data-search={`${titulo}`}
                                    key={mando.id}
                                >
                                    <h4>{titulo}</h4>
                                    <div className="col-12 p-2 mando-control">
                                        <VariablesMando
                                            variables={mando.variables}
                                            porcentaje={porcentaje}
                                            etapa={mando.datos.tipoDeEtapa}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <JerarquiasMando
                                            jerarquias={mando.datos.jerarquias}
                                            rangos={mando.rangos}
                                        />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <Link
                                            className="btn btn-success"
                                            to={`/mandos/${mando.id}`}
                                        >
                                            Ver
                                        </Link>
                                        <DeleteAction
                                            url={this.props.url}
                                            id={mando.id}
                                            oneProfile={false}
                                            history={this.props.history}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Mandos;
