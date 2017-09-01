import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../components/registration/registration-form';
import { bindActionCreators } from 'redux';
import {fetchRegistrationRequest, formChanged} from '../actions/user';
import {withRouter} from "react-router-dom";
import { Redirect } from 'react-router';


class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formInputChanged = this.formInputChanged.bind(this);
    }

    handleSubmit(ev) {
        ev.preventDefault();

        var isFromAdmin = this.props.location.pathname === '/all-users';
        const {username, password} = this.props.user;
        this.props.fetchRegistrationRequest(username, password, isFromAdmin);
    }

    formInputChanged(newFormState) {
        this.props.formChanged(newFormState);
    }

    render(){
        const redirAfterLogin = this.props.user.isLoggedIn ? 
        <Redirect to={'/home'}/>
        : '';

        const form =  this.props.user.isFetching ?
        <div> Loading </div>
        :
        <Form
            handleSubmit={this.handleSubmit}
            formInputChanged={this.formInputChanged}
            username={this.props.user.username}
            password={this.props.user.password}
            usernameTaken={this.props.user.usernameTaken} 
            heading='Register'/>



    return(
       <div>
           <div>{form}</div>
           <div>{redirAfterLogin}</div>
       </div>
    )}
    
}

function mapStateToProps({user}) {
    return {user};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchRegistrationRequest, formChanged}, dispatch);
    //return { actions: bindActionCreators(fetchRegistrationRequest, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegistrationForm));