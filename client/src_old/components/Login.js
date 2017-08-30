import React, {Component} from 'react'
import {connect} from 'react-redux'
import Form from './common/Form'
import { bindActionCreators } from 'redux';

import {loginRequest, clearError} from '../actions'

class Login extends Component {
  constructor () {
    super()

    this._login = this._login.bind(this);
  }

  render () {
    
    let {dispatch} = this.props
    let {currentlySending, error} = this.props.data

    return (
        <div className='form-page__wrapper'>
            <div className='form-page__form-wrapper'>
            <div className='form-page__form-header'>
            <h2 className='form-page__form-heading'>Login</h2>
            </div>
            <Form data={this.props.data} 
                dispatch={dispatch}
                history={this.props.history}
                onSubmit={this._login}
                btnText={'Login'} 
                error={error}
                currentlySending={currentlySending} />
        </div>
    </div>
    )
  }

  _login (username, password) {
    this.props.dispatch(loginRequest({username, password}))
    setTimeout(() => {
      //TODO: remove IT
       //this.props.dispatch(loginRequest({username, password}))
       this.props.history.push('/profile');
    }, 1000)
  }
}

Login.propTypes = {
  data: React.PropTypes.object,
  history: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

// Which props do we want to inject, given the global state?
function select (state) {
  return {
    data: state
  }
}


// Wrap the component to inject dispatch and state into it
export default connect(select, null)(Login)