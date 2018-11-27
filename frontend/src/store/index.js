import { createStore, applyMiddleware, combineReducers } from 'redux';
import customMiddleWare from './middleware';
import { nonFetchData } from './reducers/non-fetch-data';

export default createStore(combineReducers({ nonFetchData }), applyMiddleware(customMiddleWare))