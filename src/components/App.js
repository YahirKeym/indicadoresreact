import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Layout from './Layout.js';
import Inicio from '../pages/Inicio.js';
import Objetivos from '../pages/Objetivos.js';
import ObjetivosAdd from '../pages/objetivosAdd.js';
function App()
{
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route exact path="/objetivos" component={Objetivos} />
            <Route exact path="/objetivos/add" component={ObjetivosAdd} />
            <Route component={Inicio} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
}
export default App;