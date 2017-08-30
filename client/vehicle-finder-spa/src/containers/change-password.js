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
        const form = this.props.user.isFetching ?
        <div> Loading </div>
        :
        <Form
            handleSubmit={this.handleSubmit}
            formInputChanged={this.formInputChanged}
            oldPassword={this.props.user.oldPassword}
            newPassword={this.props.user.newPassword}
            newPasswordRepeat={this.props.user.newPasswordRepeat} 
            passwordChanged={this.props.user.passwordChanged}
            passwordChangeError={this.props.user.passwordChangeError}
            currentErrorMessage={this.props.user.currentErrorMessage}/>

    return(
        <div>{form}</div>
    )}
    
}

function mapStateToProps({user}) {
    return {user};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({requestPasswordChange, formChanged}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);