import { createStore, applyMiddleware, combineReducers } from 'redux';
import customMiddleWare from './middleware';
import { nonFetchData } from './reducers/non-fetch-data';
import { token } from './reducers/token';
import { teams } from './reducers/teams';
import { auth } from './reducers/auth';
import { sessions } from './reducers/sessions';

export default createStore(combineReducers({ sessions, nonFetchData, token, teams, auth }), applyMiddleware(customMiddleWare))