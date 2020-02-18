import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const logger = createLogger();
const middlewares = [thunk, logger]
const store = createStore(
    reducer, 
    composeWithDevTools(
        applyMiddleware(...middlewares)
    )
);

export default store;