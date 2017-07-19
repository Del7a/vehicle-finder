import React from 'react';
import {Component} from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import { createHashHistory } from 'history';
import {Provider} from 'react-redux';
import './index.css';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import RegistrationForm from './containers/registration';
import NotFound from './components/notfound';



const history = createHashHistory();

const store = createStore(
    rootReducer, applyMiddleware(thunkMiddleware)
  );

store.subscribe(() => { });

class Home extends Component {
  render() {
    return(<div>HOME</div>);
  }
}

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter history={history}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/register' component={RegistrationForm} />
                        <Route path='*' component={NotFound} />
                    </Switch>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
