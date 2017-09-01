import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../components/registration/registration-form';
import { bindActionCreators } from 'redux';
import {requestLogin, formChanged} from '../actions/user';

import { Redirect } from 'react-router'


class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formInputChanged = this.formInputChanged.bind(this);
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const {username, password} = this.props.user;
        this.props.requestLogin(username, password);
    }

    formInputChanged(newFormState) {
        this.props.formChanged(newFormState);
    }    

    render(){
        const redirAfterLogin = this.props.user.isLoggedIn ? 
           <Redirect to={'/home'}/>
        : '';

        const form = this.props.user.isFetching ?
        <div> Носи се! </div>
        :
        <Form
            handleSubmit={this.handleSubmit}
            formInputChanged={this.formInputChanged}
            username={this.props.user.username}
            password={this.props.user.password}
            loginFailed={this.props.user.loginFailed} 
            heading='Login'/>

    return(
        <div>
            <div>{form}</div>
            <div>{redirAfterLogin}</div>
        </div>
    )}
    
}

function mapStateToProps({user}) {
    console.log(user)
    return {user};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({requestLogin, formChanged}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);