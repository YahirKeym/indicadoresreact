import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'babel-polyfill';
import "es6-promise";
import "isomorphic-fetch";
ReactDOM.render(<App />, document.getElementById('webindicadores'));

