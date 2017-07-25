import React from 'react';
import {Component} from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {createHashHistory} from 'history';
import {Provider} from 'react-redux';
import './index.css';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import RegistrationForm from './containers/registration';
import LoginForm from './containers/login';
import ChangePassword from './containers/change-password';
import Profile from './containers/profile';
import NotFound from './components/notfound';
import SingleMaker from './containers/maker/single-maker';
import SingleModel from './containers/model/single-model';
import AllMakers from './containers/maker/all-makers';
import { routerReducer, routerMiddleware } from 'react-router-redux'





const store = createStore(
    rootReducer, applyMiddleware(thunkMiddleware)
  );

const history = createHashHistory(store);

store.subscribe(() => { });

class Home extends Component {
  render() {
    return(<div>HOME</div>);
  }
}

class App extends Component {
  render() {
    
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />

        <Provider store={store}>
            <BrowserRouter history={history}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/home' component={Home} />
                        <Route path='/register' component={RegistrationForm} />
                        <Route path='/login' component={LoginForm} />
                        <Route path='/change-pass' component={ChangePassword} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/single-maker/:id' component={SingleMaker} />
                        <Route path='/model/:makerId/:modelId' component={SingleModel} />
                        <Route path='/all-makers' component={AllMakers} />
                        <Route path='*' component={NotFound} />
                    </Switch>
            </BrowserRouter>
        </Provider>
        </div>
    );
  }
}

export default App;
