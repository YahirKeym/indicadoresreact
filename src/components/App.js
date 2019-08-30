// Estás dependencias se encontraran aquí hasta que haga un inyector de dependencias.
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Alcance from "../pages/Alcance/Alcance.js";
import AlcanceAdd from "../pages/Alcance/AlcanceAdd.js";
import AlcanceEdit from "../pages/Alcance/AlcanceEdit.js";
import AlcanceDelete from "../pages/Alcance/AlcanceDelete.js";
import ErrorConexion from "./Errores/ErrorConexion.js";
import ErrorInternetExplorer from "./Errores/ErrorInternetExplorer.js";
import Inicio from "../pages/Inicio.js";
import Jerarquias from "../pages/Jerarquias/Jerarquias.js";
import JerarquiasAdd from '../pages/Jerarquias/JerarquiasAdd.js';
import JerarquiasMove from '../pages/Jerarquias/JerarquiasMove.js';
import JerarquiaRangoAdd from '../pages/Jerarquias/JerarquiaRangoAdd.js';
import JerarquiaRangoEdit from '../pages/Jerarquias/JerarquiaRangoEdit.js';
import Layout from "./Layout.js";
import Loader from "./Generales/Loader.js";
import Mandos from "../pages/Mandos/Mandos.js";
import MandosAdd from "../pages/Mandos/MandosAdd.js";
import MandosProfile from '../pages/Mandos/MandosProfile.js';
import Objetivos from "../pages/Objetivos/Objetivos.js";
import ObjetivosAdd from "../pages/Objetivos/ObjetivosAdd.js";
import ObjetivosEdit from "../pages/Objetivos/ObjetivosEdit.js";
import ObtenCookie from "./ObtenCookie.js";
import Paises from "../pages/Paises/Paises.js";
import PaisesAdd from "../pages/Paises/PaisesAdd.js";
import PaisesEdit from '../pages/Paises/PaisesEdit.js';
import PaisesDelete from '../pages/Paises/PaisesDeleted.js';
import UserLogin from "../pages/UserLogin.js";
import BrouserName from "./Generales/BrouserName.js";
import AllObjetives from "../pages/Objetivos/AllObjetives.js";
/**
 * La clase app será la clase principal la cual mandara a llamar cada parte de la web que solicitemos.
 */
class App extends React.Component {
    /**
     * Ayudara a inicializar la clase haciendo globales las propiedades que le pasemos y inicializando un estado
     * @param {*} props Son las propiedades de la clase
     */
    constructor(props) {
        super(props);
        this.state = {
            isLogged : undefined,
            error: false
        }
        this.varyfiLogged = this.veryfiLogged.bind(this);
    }
    /**
     * Está función le mandara la cookie que por default se encuentre y se la enviara a la api la cual verificara si el usuario se encuentra activo
     * o Bien si el usuario se encuentra logueado. También armara las url necesarias para el uso de la api
     */
    veryfiLogged = async () => {
        this.logged = false;
        this.session = ObtenCookie("indicadores_i");
        const URL_BASE = "http://172.16.100.196";
        const LUGAR = "indicadoresreact";
        try {
            this.urlAutentica = `${URL_BASE}/${LUGAR}/api/controller/autentica.php?token=${this.session}`;
            const response = await fetch(this.urlAutentica);
            const datos = await response.json();
            this.urlPortal = `${URL_BASE}/${LUGAR}/api/controller/portal.php?token=${this.session}`;
            this.urlObjetivos = `${URL_BASE}/${LUGAR}/api/controller/objetivos.php?token=${this.session}`;
            this.urlMandos = `${URL_BASE}/${LUGAR}/api/controller/mandos.php?token=${this.session}`;
            this.urlAlcance = `${URL_BASE}/${LUGAR}/api/controller/alcance.php?token=${this.session}`;
            this.urlPaises = `${URL_BASE}/${LUGAR}/api/controller/paises.php?token=${this.session}`;
            this.urlJerarquias = `${URL_BASE}/${LUGAR}/api/controller/jerarquias.php?token=${this.session}`;
            this.urlRango = `${URL_BASE}/${LUGAR}/api/controller/rango.php?token=${this.session}`;
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
    /**
     * Una vez montado el componente mandaremos a verificar el logue deo usuario y así poder darle la pestaña y menú que le corresponde.
     */
    componentDidMount() {
        this.veryfiLogged();
    }

    /**
     * Mandamos a llamar la renderización del componenten
     */
    render() {
        let errorIE;
        // Si el usuario se encuentra usando Internet explorer 11, le mandaremos que muchas funciones no se encontraran activas y que el mal
        // uso de la app podría deberse a eso.
        if(BrouserName() === "IE 11"){
            errorIE = <ErrorInternetExplorer />
        }
        // Si por alguna razón no podemos verificar el usuario logueado o bien hay algún tipo de error de conexión con la api.
        // Le diremos al usuario que cuenta con un error de conexión.
        if(this.state.error){
            return(
                <BrowserRouter>
                    <Layout state={this.state} url={this.urlPortal}>
                        <ErrorConexion />
                    </Layout>
                </BrowserRouter>
            )
        }
        // Si el estado de logueo no se encuentra definido, le mandaremos un loader en lo que carga por completo el componente
        if(this.state.isLogged === undefined )
        {
        return (
            <BrowserRouter>
                <Layout state={this.state} url={this.urlPortal}>
                    <Loader />
                </Layout>
            </BrowserRouter>
            );
        }
        // Definimos el estado de usuario logueado en false, para despúes poder hacer una validación con los dos parametros que nos traiga el estado.
        let logueado = false;
        if(this.state.isLogged && this.state.logged){
            logueado = true;
        }
        // Esté return manejara las rutas de la web así de a donde nos  lleve la web, se encargaran estos switch
        return (
            <BrowserRouter>
                <Layout state={this.state} url={this.urlPortal}>
                    {errorIE}
                    {/* Si no nos encontramos logueados, se mostrara el loguin de usuario de inicio */}
                    {!logueado && (
                        <Switch>
                            <Route component={() => <UserLogin url={this.urlAutentica} />} />
                        </Switch>
                    )}
                    {/* En caso de encontrarnos logueados empezara a funcionar la magia de las SPA */}
                    {logueado && (
                        <Switch>
                            {errorIE}
                            {/* Aquí manejaremos lo que es la ruta de incio */}
                            <Route
                                exact
                                path="/"
                                component={() => <Inicio />}
                            />
                            {/* En este lugar empezaremos a manejar lo que son las rutas de los objetivos */}
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
                            {/* Mostraremos todos los indicadores que cada objetivo contenga. */}
                            <Route
                                exact
                                path="/general"
                                component={({match,history}) => (
                                    <AllObjetives
                                        url={this.urlObjetivos}
                                        match={match}
                                        history={history}
                                    />
                                )}
                            />
                            {/* En este caso de objetivos podemos ver que tiene ":objetivoId" Esto es una propiedad de react-router-dom
                            * La cual nos ayuda a obtener la propiedad que se encuentre entre "objetivos" y "edit"
                            * Un vago ejemplo sería http://localhost/objetivos/1/edit. El cúal nos mandara a la página del objetivo 1 para editar
                            */}
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
                            {/* Aquí comenzaran las rutas de los mandos */}
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
                            {/* Al igual que en los objetivos se busca que el ":mandoId" sea el número id del mando>indicador al cual podremos ver
                         */}
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
                                path="/mandos/:mandoId/:esHeredado"
                                component={({ match, history }) => (
                                    <MandosProfile
                                        history={history}
                                        match={match}
                                        url={this.urlMandos}
                                        urlObjetivos={this.urlObjetivos}
                                    />
                                )}
                            />
                            {/** Pensando en refactorizar el alcance */}
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
                            {/** Pensando en refactorizar los paises */}
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
                            {/**Pensando en refactorizar las jerarquias */}
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
