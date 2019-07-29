import React from "react";
import { Link } from "react-router-dom";
import ButtonDirectTop from "../../components/Generales/ButtonDirectTop.js";
import DeleteAction from "../../components/DeleteAction.js";
import { Helmet } from "react-helmet";
import Loader from "../../components/Generales/Loader.js";
import ErrorConexion from "../../components/Errores/ErrorConexion.js";
import SinDatos from "../../components/Errores/SinDatos.js";
import TraeDatos from "../../components/TraeDatos.js";
import BuscadorIncremental from "../../components/Generales/BuscadorIncremental.js";
import DecodificaMalos from "../../components/Generales/DecodificaMalos.js";
import VariablesMando from '../../components/Mandos/VariablesMando.js';
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
        this.buscadorTime = setTimeout(()=>{BuscadorIncremental({claseCorrecta: "d-block",claseIncorrecta:"d-none",buscador: "buscaMandos",seBusca:"mandos"})},1000);
        return (
            <React.Fragment>
                <Helmet>
                    <title>Indicadores - Indicadores</title>
                </Helmet>
                <div className="col-12 row m-0">
                    <ButtonDirectTop to="/mandos/add" text="Añadir nuevo mando" />
                    <div className="col-12">
                        <input name="buscaMandos" type="text" className="form-control mb-3 col-6" placeholder="Buscar indicador" />
                    </div>
                    {this.state.data.length === 0 && (
                        <SinDatos />
                    )}
                    <div
                        className="col-12 row d-flex justify-content-between m-0"
                        search-name="mandos"
                    >
                        {this.state.data.map(mando => {
                            let AceptacionBuena, AceptacionMedio;
                            if(mando.datos.AceptacionBuena === undefined || mando.datos.AceptacionBuena === 0 ){
                                AceptacionBuena = 94;
                            }else{
                                AceptacionBuena = mando.datos.AceptacionBuena;
                            }
                            if(mando.datos.AceptacionMedia=== undefined || mando.datos.AceptacionMedia === 0 ){
                                AceptacionMedio = 80;
                            }else{
                                AceptacionMedio = mando.datos.AceptacionMedia;
                            }
                            const porcentaje = {
                                porcentajeBueno: AceptacionBuena,
                                porcentajeMedio: AceptacionMedio 
                            };
                            let titulo = DecodificaMalos(mando.datos.titulo);
                            if (titulo.length === 0) {
                                titulo = DecodificaMalos(
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
                                            muestraPorcentaje={true}
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
