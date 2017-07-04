import React from 'react';
import {Component} from 'react'
import ReactDOM from 'react-dom';
import {Router, Route, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import { createHashHistory } from 'history'
import App from './App';
import {Provider} from 'react-redux'
import './index.css';
//import './styles/main.css'
import { createStore } from 'redux';
import rootReducer from './reducers';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'
import {clearError} from './actions'


const history = createHashHistory()

const store = createStore(
    rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

store.subscribe(() => {console.log("store changed")});


function checkAuth (nextState, replace) {
  let {loggedIn} = store.getState()

  store.dispatch(clearError())

  // Check if the path isn't dashboard. That way we can apply specific logic to
  // display/render the path we want to
    if (nextState.location.pathname !== '/dashboard') {
        if (loggedIn) {
            if (nextState.location.state && nextState.location.pathname) {
            replace(nextState.location.pathname)
            } else {
            replace('/')
            }
        }
    } else {
    // If the user is already logged in, forward them to the homepage
        if (!loggedIn) {
            if (nextState.location.state && nextState.location.pathname) {
                replace(nextState.location.pathname)
            } else {
                replace('/')
            }
        }
    }
}

class Found extends Component {
  render () {
    return (
      <article>
        <h1>Page found.</h1>
      </article>
    )
  }
}

class AutoBot extends Component {
  render () {
    return (
      <Provider store={store}>
            <BrowserRouter history={history}>
                <App>
                    <Switch>
                        <Route path='/dashboard' component={Dashboard} />
                        <Route path='/register' component={Register} />
                        <Route path='/login' component={Login} />
                        <Route path='*' component={NotFound} />                    
                    </Switch>
                </App>
            </BrowserRouter>
      </Provider>
    )
  }
}



ReactDOM.render(
  <AutoBot />,
  document.getElementById('root')
);
