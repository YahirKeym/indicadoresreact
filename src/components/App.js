import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./Layout.js";
import Inicio from "../pages/Inicio.js";
import Objetivos from "../pages/Objetivos.js";
import ObjetivosAdd from "../pages/ObjetivosAdd.js";
import ObjetivosEdit from "../pages/ObjetivosEdit.js";
import UserLogin from "../pages/UserLogin.js";
import Mandos from "../pages/Mandos.js";
import MandosAdd from "../pages/MandosAdd.js";
import Alcance from "../pages/Alcance.js";
import AlcanceAdd from "../pages/AlcanceAdd.js";
import AlcanceEdit from "../pages/AlcanceEdit.js";
import AlcanceDelete from "../pages/AlcanceDelete.js";
import Paises from "../pages/Paises.js";
import PaisesAdd from "../pages/PaisesAdd.js";
import PaisesEdit from '../pages/PaisesEdit.js';
import PaisesDelete from '../pages/PaisesDeleted.js';
import Jerarquias from "../pages/Jerarquias.js";
import JerarquiasAdd from '../pages/JerarquiasAdd.js';
import JerarquiasMove from '../pages/JerarquiasMove.js';
import JerarquiaRangoAdd from '../pages/JerarquiaRangoAdd.js';
import JerarquiaRangoEdit from '../pages/JerarquiaRangoEdit.js';

/**
 * Nos ayudara a ajustar las opciones de la web
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        this.varyfiLogged = this.veryfiLogged.bind(this);
        this.state = {
            isLogged: undefined
        };
    }
    veryfiLogged = async () => {
        this.session = this.getCookie("indicadores_i");
        const response = await fetch(
            `http://localhost/indicadoresreact/api/controller/autentica.php?token=${
                this.session
            }`
        );
        const datos = await response.json();
        this.urlObjetivos = `http://localhost/indicadoresreact/api/controller/objetivos.php?token=${this.session}`;
        this.urlAlcance = `http://localhost/indicadoresreact/api/controller/alcance.php?token=${this.session}`;
        this.urlPaises = `http://localhost/indicadoresreact/api/controller/paises.php?token=${this.session}`;
        this.urlJerarquias = `http://localhost/indicadoresreact/api/controller/jerarquias.php?token=${this.session}`;
        this.urlRango = `http://localhost/indicadoresreact/api/controller/rango.php?token=${this.session}`;
        this.setState({
            isLogged: datos.autenticado
        });
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
        if(this.state.isLogged === undefined)
        {
            return (
                <div></div>
            );
        }
        return (
            <BrowserRouter>
                <Layout>
                    {!this.state.isLogged && (
                        <Switch>
                            <Route component={() => <UserLogin />} />
                        </Switch>
                    )}
                    {this.state.isLogged && (
                        <Switch>
                            <Route
                                exact
                                path="/"
                                component={() => <Inicio />}
                            />
                            <Route
                                exact
                                path="/objetivos"
                                component={() => (
                                    <Objetivos
                                        urlObjetivos={this.urlObjetivos}
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
                                        urlObjetivos={this.urlObjetivos}
                                        urlRangos={this.urlRango}
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
