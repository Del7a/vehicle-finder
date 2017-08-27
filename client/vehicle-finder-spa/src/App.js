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
import AllUsers from './containers/user-management/all-users';
import SingleUser from './containers/user-management/single-user';
import NewArticle from './containers/article/new-article';
import AllArticles from './containers/article/all-articles';
import SingleArticle from './containers/article/single-article';
import NewSubscription from './containers/subscription/new-subscription';
import AllSubscriptions from './containers/subscription/all-subscriptions';
import SingleSubscription from './containers/subscription/single-subscription';
import AllMessageThreads from './containers/messages/all-message-threads';
import SingleMessageThread from './containers/messages/single-thread';
import Navbar from './containers/navbar'
import { routerReducer, routerMiddleware } from 'react-router-redux';




const store = createStore(
    rootReducer, applyMiddleware(thunkMiddleware)
  );

const history = createHashHistory(store);

store.subscribe(() => { });

class App extends Component {
  render() {
    
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />

        <Provider store={store}>
            <BrowserRouter history={history}>
              <div>
                <Navbar />
                    <Switch>
                        
                        <Route path='/register' component={RegistrationForm} />
                        <Route path='/login' component={LoginForm} />
                        <Route path='/change-pass' component={ChangePassword} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/single-maker/:id' component={SingleMaker} />
                        <Route path='/create-maker' component={SingleMaker} />
                        <Route path='/model/:makerId/:modelId' component={SingleModel} />
                        <Route path='/all-makers' component={AllMakers} />
                        <Route path='/all-users' component={AllUsers} />
                        <Route path='/user/:userId' component={SingleUser} />
                        <Route path='/create-article' component={NewArticle} />
                        <Route path='/edit-article/:id' component={NewArticle} />
                        <Route path='/articles' component={AllArticles} />
                        <Route path='/article/:id' component={SingleArticle} />
                        <Route path='/create-subscription' component={NewSubscription} />
                        <Route path='/subscriptions' component={AllSubscriptions} />
                        <Route path='/subscription/:id' component={SingleSubscription} />
                        <Route path='/messages/:id' component={SingleMessageThread} />
                        <Route path='/messages' component={AllMessageThreads} />
                        
                        <Route path='*' component={NotFound} />
                    </Switch>
              </div>
            </BrowserRouter>
        </Provider>
        </div>
    );
  }
}

export default App;
