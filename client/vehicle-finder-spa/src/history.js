import {createHashHistory} from 'history';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import { routerReducer } from 'react-router-redux'


const store = createStore(
    rootReducer, routerReducer, applyMiddleware(thunkMiddleware)
  );

const history = createHashHistory(store);

export {history, store};
