import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../components/registration/registration-form';
import { bindActionCreators } from 'redux';
import {fetchRegistrationRequest, formChanged} from '../actions/user';


class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formInputChanged = this.formInputChanged.bind(this);
    }

    handleSubmit(ev) {
        console.log(ev);
        const {username, password} = this.props.user;
        this.props.fetchRegistrationRequest(username, password);
    }

    formInputChanged(newFormState) {
        this.props.formChanged(newFormState);
    }


    render(){
    return(
        this.props.user.isFetching ?
        <div> Носи се! </div>
        :
        <Form
            handleSubmit={this.handleSubmit}
            formInputChanged={this.formInputChanged}
            username={this.props.user.username}
            password={this.props.user.password} />
    )}
    
}

function mapStateToProps({user}) {
    return {user};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchRegistrationRequest, formChanged}, dispatch);
    //return { actions: bindActionCreators(fetchRegistrationRequest, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);