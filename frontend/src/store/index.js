import { createStore, applyMiddleware, combineReducers } from 'redux';
import customMiddleWare from './middleware';
import { nonFetchData } from './reducers/non-fetch-data';
import { token } from './reducers/token';

export default createStore(combineReducers({ nonFetchData, token }), applyMiddleware(customMiddleWare))