import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Alcance from "../pages/Alcance/Alcance.js";
import AlcanceAdd from "../pages/Alcance/AlcanceAdd.js";
import AlcanceEdit from "../pages/Alcance/AlcanceEdit.js";
import AlcanceDelete from "../pages/Alcance/AlcanceDelete.js";
import ErrorConexion from "./ErrorConexion.js";
import Inicio from "../pages/Inicio.js";
import Jerarquias from "../pages/Jerarquias/Jerarquias.js";
import JerarquiasAdd from '../pages/Jerarquias/JerarquiasAdd.js';
import JerarquiasMove from '../pages/Jerarquias/JerarquiasMove.js';
import JerarquiaRangoAdd from '../pages/Jerarquias/JerarquiaRangoAdd.js';
import JerarquiaRangoEdit from '../pages/Jerarquias/JerarquiaRangoEdit.js';
import Layout from "./Layout.js";
import Loader from "./Loader.js";
import Mandos from "../pages/Mandos/Mandos.js";
import MandosAdd from "../pages/Mandos/MandosAdd.js";
import MandosProfile from '../pages/Mandos/MandosProfile.js';
import Objetivos from "../pages/Objetivos/Objetivos.js";
import ObjetivosAdd from "../pages/Objetivos/ObjetivosAdd.js";
import ObjetivosEdit from "../pages/Objetivos/ObjetivosEdit.js";
import Paises from "../pages/Paises/Paises.js";
import PaisesAdd from "../pages/Paises/PaisesAdd.js";
import PaisesEdit from '../pages/Paises/PaisesEdit.js';
import PaisesDelete from '../pages/Paises/PaisesDeleted.js';
import UserLogin from "../pages/UserLogin.js";
/**
 * Nos ayudara a ajustar las opciones de la web
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged : undefined,
            error: false
        }
        this.varyfiLogged = this.veryfiLogged.bind(this);
    }
    veryfiLogged = async () => {
        this.logged = false;
        this.session = this.getCookie("indicadores_i");
        const URL_BASE = "http://172.16.100.94";
        try {
            this.urlAutentica = `${URL_BASE}/indicadoresreact/api/controller/autentica.php?token=${this.session}`;
            const response = await fetch(this.urlAutentica);
            const datos = await response.json();
            this.urlObjetivos = `${URL_BASE}/indicadoresreact/api/controller/objetivos.php?token=${this.session}`;
            this.urlMandos = `${URL_BASE}/indicadoresreact/api/controller/mandos.php?token=${this.session}`;
            this.urlAlcance = `${URL_BASE}/indicadoresreact/api/controller/alcance.php?token=${this.session}`;
            this.urlPaises = `${URL_BASE}/indicadoresreact/api/controller/paises.php?token=${this.session}`;
            this.urlJerarquias = `${URL_BASE}/indicadoresreact/api/controller/jerarquias.php?token=${this.session}`;
            this.urlRango = `${URL_BASE}/indicadoresreact/api/controller/rango.php?token=${this.session}`;
            if(datos.autenticado)
            {
                this.setState({
                    isLogged: datos.autenticado,
                    logged : datos.autenticado
                });
            }else{
                this.setState({
                    isLogged: datos.autenticado
                })
            }
        } catch (e) {
            this.setState({
                error:true
            })
        }
    };
    componentDidMount() {
        this.veryfiLogged();
    }
    /**
     * Nos ayudara a encontrar la cookie de sesión
     * @param {string} nombreCookie Será el nombre de la cookie que buscaremos
     */
    getCookie = nombreCookie => {
        var name = nombreCookie + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };
    /**
     *
     */
    render() {
        if(this.state.error){
            return(
                <BrowserRouter>
                    <Layout state={this.state}>
                        <ErrorConexion />
                    </Layout>
                </BrowserRouter>
            )
        }
        if(this.state.isLogged === undefined )
        {
        return (
            <BrowserRouter>
                <Layout state={this.state}>
                    <Loader />
                </Layout>
            </BrowserRouter>
            );
        }
        let logueado = false;
        if(this.state.isLogged && this.state.logged){
            logueado = true;
        }
        return (
            <BrowserRouter>
                <Layout state={this.state}>
                    {!logueado && (
                        <Switch>
                            <Route component={() => <UserLogin url={this.urlAutentica} />} />
                        </Switch>
                    )}
                    {logueado && (
                        <Switch>
                            <Route
                                exact
                                path="/"
                                component={() => <Inicio />}
                            />
                            <Route
                                exact
                                path="/objetivos"
                                component={({match,history}) => (
                                    <Objetivos
                                        url={this.urlObjetivos}
                                        match={match}
                                        history={history}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/objetivos/add"
                                component={() => (
                                    <ObjetivosAdd
                                        url={this.urlObjetivos}
                                        urlAlcance={this.urlAlcance}
                                        urlPais={this.urlPaises}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/objetivos/:objetivoId/edit"
                                component={({ match, history }) => (
                                    <ObjetivosEdit
                                        history={history}
                                        match={match}
                                        url={this.urlObjetivos}
                                        urlAlcance={this.urlAlcance}
                                        urlPais={this.urlPaises}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/mandos"
                                component={({ match, history }) => (
                                    <Mandos
                                        history={history}
                                        match={match}
                                        url={this.urlMandos}
                                        urlObjetivos={this.urlObjetivos}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/mandos/add"
                                component={({ match, history }) => (
                                    <MandosAdd
                                    history={history}
                                    match={match}
                                    url={this.urlMandos}
                                    urlObjetivos={this.urlObjetivos}
                                    urlRangos={this.urlRango}
                                    urlJerarquias={this.urlJerarquias}
                                    urlAutentica={this.urlAutentica}
                                    />
                                    )}
                            />
                            <Route
                                exact
                                path="/mandos/:mandoId"
                                component={({ match, history }) => (
                                    <MandosProfile
                                        history={history}
                                        match={match}
                                        url={this.urlMandos}
                                        urlObjetivos={this.urlObjetivos}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/tipos/alcance"
                                component={({ match, history }) => (
                                    <Alcance
                                        history={history}
                                        match={match}
                                        url={this.urlAlcance}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/tipos/alcance/add"
                                component={({ match, history }) => (
                                    <AlcanceAdd
                                        history={history}
                                        match={match}
                                        url={this.urlAlcance}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/tipos/alcance/:alcanceId/edit"
                                component={({ match, history }) => (
                                    <AlcanceEdit
                                        history={history}
                                        match={match}
                                        url={this.urlAlcance}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/tipos/alcance/:alcanceId/delete"
                                component={({ match, history }) => (
                                    <AlcanceDelete
                                        history={history}
                                        match={match}
                                        url={this.urlAlcance}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/paises"
                                component={({ match, history }) => (
                                    <Paises
                                        history={history}
                                        match={match}
                                        url={this.urlPaises}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/paises/add"
                                component={({ match, history }) => (
                                    <PaisesAdd
                                        history={history}
                                        match={match}
                                        url={this.urlPaises}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/paises/:paisId/edit"
                                component={({ match, history }) => (
                                    <PaisesEdit
                                        history={history}
                                        match={match}
                                        url={this.urlPaises}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/paises/:paisId/delete"
                                component={({ match, history }) => (
                                    <PaisesDelete
                                        history={history}
                                        match={match}
                                        url={this.urlPaises}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/jerarquia"
                                component={({ match, history }) => (
                                    <Jerarquias
                                        history={history}
                                        match={match}
                                        url={this.urlJerarquias}
                                        urlRango={this.urlRango}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/jerarquia/add"
                                component={({ match, history }) => (
                                    <JerarquiasAdd
                                        history={history}
                                        match={match}
                                        url={this.urlJerarquias}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/jerarquia/move"
                                component={({ match, history }) => (
                                    <JerarquiasMove
                                        history={history}
                                        match={match}
                                        url={this.urlJerarquias}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/jerarquia/rango/add"
                                component={({ match, history }) => (
                                    <JerarquiaRangoAdd
                                        history={history}
                                        match={match}
                                        url={this.urlRango}
                                        urlJerarquias = {this.urlJerarquias}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/jerarquia/:rangoId"
                                component={({ match, history }) => (
                                    <JerarquiaRangoEdit
                                        history={history}
                                        match={match}
                                        url={this.urlRango}
                                        urlJerarquias = {this.urlJerarquias}
                                    />
                                )}
                            />
                            <Route component={Inicio} />
                        </Switch>
                    )}
                </Layout>
            </BrowserRouter>
        );
    }
}
export default App;
