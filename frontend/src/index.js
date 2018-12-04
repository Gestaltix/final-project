import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './containers/app'
import { MuiThemeProvider } from "@material-ui/core";
import Skunk from "./themes/skunk";
import Provider from "react-redux/es/components/Provider";
import store from "./store";

ReactDOM.render(
    <MuiThemeProvider theme={Skunk}>
        <Provider store={store}>
            <App/>
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
