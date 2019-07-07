import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Layout from './Layout.js';
import Inicio from '../pages/Inicio.js';
import Objetivos from '../pages/Objetivos.js';
function App()
{
    return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Inicio}/>
                        <Route exact path="/objetivos" component={Objetivos} />
                        <Route component={Inicio} />
                    </Switch>
                </Layout>
            </BrowserRouter>
    );
}
export default App;