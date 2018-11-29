import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './containers/home';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './containers/login';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Skunk from './themes/skunk';
import CreateSession from './containers/create-session';

ReactDOM.render(
    <MuiThemeProvider theme={Skunk}>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/create-session' component={CreateSession} />
                </Switch>
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
