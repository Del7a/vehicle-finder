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
        debugger
        this.props.getUserProfile()
        console.log(this.props)
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
            email={this.props.user.email} 
            currentInfoMessage={this.props.user.currentInfoMessage}
            currentErrorMessage={this.props.user.currentErrorMessage}/>
    return(
        <div>{form}</div>
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