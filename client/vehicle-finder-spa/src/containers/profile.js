import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../components/profile/info';
import { bindActionCreators } from 'redux';
import {getUserProfile, postUserProfile, formChanged} from '../actions/user';

import { Redirect } from 'react-router'


class ProfileForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formInputChanged = this.formInputChanged.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.props.getUserProfile()
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const {username, email, firstName, lastName} = this.props.user;
        this.props.postUserProfile(username, email, firstName, lastName);
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
            firstName={this.props.user.firstName}
            lastName={this.props.user.lastName}
            email={this.props.user.email} />

    return(
        <div>
            <h1>Profile</h1>
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
    return bindActionCreators({getUserProfile, formChanged, postUserProfile}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);