import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../components/profile/change-pass-form';
import { bindActionCreators } from 'redux';
import {requestPasswordChange, formChanged} from '../actions/user';



class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formInputChanged = this.formInputChanged.bind(this);
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const {oldPassword, newPassword, newPasswordRepeat} = this.props.user;
        this.props.requestPasswordChange(oldPassword, newPassword, newPasswordRepeat);
    }

    formInputChanged(newFormState) {
        this.props.formChanged(newFormState);
    }


    render(){

        const passCahngedSuccess = this.props.user.passwordChanged ?
        <div className="alert alert-success">
            <strong>Success!</strong> Password changed
        </div>
        : ''

        const passChangeError = this.props.user.passwordChangeError ?
         <div className="alert alert-danger">
            <strong>Error!</strong> {this.props.user.currentErrorMessage}
        </div>
        : ''

        const form = this.props.user.isFetching ?
        <div> Loading </div>
        :
        <Form
            handleSubmit={this.handleSubmit}
            formInputChanged={this.formInputChanged}
            oldPassword={this.props.user.oldPassword}
            newPassword={this.props.user.newPassword}
            newPasswordRepeat={this.props.user.newPasswordRepeat} />

    return(
        <div>
            <h1>Change Password</h1>
            <div>{passCahngedSuccess}</div>
            <div>{passChangeError}</div>
            <div>{form}</div>
        </div>
    )}
    
}

function mapStateToProps({user}) {
    return {user};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({requestPasswordChange, formChanged}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);