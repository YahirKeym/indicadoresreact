import React from "react";
import ButtonDirectTop from "../../components/Generales/ButtonDirectTop.js";
import { Helmet } from "react-helmet";
import Loader from "../../components/Generales/Loader.js";
import ErrorConexion from "../../components/Errores/ErrorConexion.js";
import TraeDatos from "../../components/TraeDatos.js";
import BuscadorIncremental from "../../components/Generales/BuscadorIncremental.js";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import MandosVista from "../../components/Mandos/MandosVista.js";
import MandosGenerales from "../../components/Mandos/MandosGenerales.js";
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
        TraeDatos({ url: this.props.url, _self: this },"heredados","heredados");
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
                <div className="col-12">
                    <input name="buscaMandos" type="text" className="form-control mb-3 col-6" placeholder="Buscar indicador" />
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Indicadores creados</Tab>
                        <Tab>Indicadores Generales</Tab>
                        <Tab>Indicadores heredados</Tab>
                    </TabList>
                    <TabPanel>
                        <ButtonDirectTop to="/mandos/add" text="Añadir nuevo mando" />
                        <MandosVista objeto={this} lugarDeDatos={this.state.data} />
                    </TabPanel>
                    <TabPanel>
                        <MandosGenerales objeto={this} lugarDeDatos={this.state}/>
                    </TabPanel>
                    <TabPanel>
                        <MandosVista objeto={this} lugarDeDatos={this.state.heredados} heredado={true}/>
                    </TabPanel>
                </Tabs>
                
            </React.Fragment>
        );
    }
}
export default Mandos;
