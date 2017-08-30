import React, { Component } from 'react';

export default class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
                username: props.username,
                email: props.email,
                firstName: props.firstName,
                lastName: props.lastName
        };
        this.validate = this.validate.bind(this);
    }

    validate(email, firstName, lastName) {
        // true means invalid, so our conditions got reversed
        var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        var regName = /^[a-zA-Z\s]*$/
        return {
            email: !regEmail.test(email),
            firstName: !regName.test(firstName),
            lastName: !regName.test(lastName)
        };
    }

    handleInputChange = (field) => evt =>{
        const newFormState = {[field]: evt.target.value};
        this.props.formInputChanged(newFormState);
        this.handleBlur(field);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }
    

    render() {
        const errors = this.validate(this.props.email,
                this.props.firstName, this.props.lastName);

        var isEnabled = !(JSON.stringify(this.state.username) === JSON.stringify(this.props.username) &&
                            JSON.stringify(this.state.email) === JSON.stringify(this.props.email) &&
                            JSON.stringify(this.state.firstName) === JSON.stringify(this.props.firstName) &&
                            JSON.stringify(this.state.lastName) === JSON.stringify(this.props.lastName))
        isEnabled = isEnabled && !Object.keys(errors).some(x => errors[x]);


        return (
            <div className="container">
                { this.props.currentInfoMessage
                    ? 
                    <div className="alert alert-success info-message">
                        <strong>Success!</strong> {this.props.currentInfoMessage}
                    </div>
                    : ""}  
                { this.props.currentErrorMessage
                    ? 
                    <div className="alert alert-danger info-message">
                        <strong>Error!</strong> {this.props.currentErrorMessage}
                    </div>
                    : ""}
                <div className="card card-container">
                <h2 className='card-title text-center'>Edit profile</h2>
                    <form className="form-fill"
                        onSubmit={this.props.handleSubmit}>
                        <p className="input_title">Username</p>
                        <input type="text" readonly={true} className="text-box" placeholder="example_user" autofocus 
                            value={this.props.username}
                            onChange={this.handleInputChange('username')}/> 

                        <p className="input_title">Email</p>
                        <input type="email" className="text-box" placeholder="example@host.domain" autofocus 
                            value={this.props.email}
                            onChange={this.handleInputChange('email')}/> 
                            { errors.email
                                ? 
                                <div className="alert alert-danger">
                                    <strong>Danger!</strong> Enter a valid email
                                </div>
                                : ""}

                        <p className="input_title">First name</p>
                            <input type="text" className="text-box" placeholder="Ivan" autofocus 
                                value={this.props.firstName}
                                onChange={this.handleInputChange('firstName')}/>  
                            { errors.firstName
                                ? 
                                <div className="alert alert-danger">
                                    <strong>Danger!</strong> Enter a valid name
                                </div>
                                : ""}

                        <p className="input_title">Last name</p>
                            <input type="text" className="text-box" placeholder="Ivanov" autofocus 
                                value={this.props.lastName}
                                onChange={this.handleInputChange('lastName')}/> 

                            { errors.lastName
                                ? 
                                <div className="alert alert-danger">
                                    <strong>Danger!</strong> Enter a valid name
                                </div>
                                : ""}                            
                        
                        <button type="submit"
                            disabled={!isEnabled}
                            className="btn btn-lg btn-primary">
                            Change </button>
                    </form>
                    </div>
                </div>
        )
    }
}