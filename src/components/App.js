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
/**
 * Nos ayudara a ajustar las opciones de la web
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        };
        this.varyfiLogged = this.veryfiLogged.bind(this);
        this.veryfiLogged();
        this.urlObjetivos = `http://localhost/indicadoresreact/api/controller/objetivos.php?token=${
            this.session
        }`;
    }

    veryfiLogged = async () => {
        this.session = this.getCookie("indicadores_i");
        const response = await fetch(
            `http://localhost/indicadoresreact/api/controller/autentica.php?token=${
                this.session
            }`
        );
        const datos = await response.json();
        this.setState({
            isLogged: datos.autenticado
        });
    };
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
                                        urlObjetivos={this.urlObjetivos}
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
                                        urlObjetivos={this.urlObjetivos}
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
                                        urlObjetivos={this.urlObjetivos}
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
