import { createStore, applyMiddleware } from 'redux';
import customMiddleWare from './middleware';

const reducer = (state = {}, action) => {
    return state
}

export default createStore(reducer, applyMiddleware(customMiddleWare))