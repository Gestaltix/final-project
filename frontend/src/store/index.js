import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import customMiddleWare from './middleware';
import { nonFetchData } from './reducers/non-fetch-data';
import { token } from './reducers/token';
import { teams } from './reducers/teams';
import { auth } from './reducers/auth';
import { sessions } from './reducers/sessions';
import { trackers } from './reducers/trackers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(combineReducers({ sessions, nonFetchData, token, teams, auth, trackers }), composeEnhancers(applyMiddleware(customMiddleWare)))