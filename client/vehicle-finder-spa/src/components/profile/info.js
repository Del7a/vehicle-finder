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
                <div className="row main">
                    <div className="main-login main-center">
                    <form className="form-horizontal"
                    onSubmit={this.props.handleSubmit}>
                    <div className="form-group">
                            <label className="cols-sm-2 control-label">User name</label>
                                <div className="cols-sm-10">
								<div className="input-group">
                               
                                <input type="text"
                                    readOnly={true}
                                    className={errors.username ? "error" : ""}
                                    value={this.props.username}
                                    onChange={this.handleInputChange('username')}
                                    onBlur={this.handleBlur('username')}
                                />
                                 </div>
                            </div>                            
                        </div>
                        <div className="form-group">
                            <label className="cols-sm-2 control-label">Email</label>
                                <div className="cols-sm-10">
								<div className="input-group">
                               
                                <input type="email"
                                    className={errors.email ? "error" : ""}
                                    value={this.props.email}
                                    onChange={this.handleInputChange('email')}
                                    onBlur={this.handleBlur('email')}
                                />
                                 </div>
                            </div> 
                            { errors.email
                                ? 
                                <div className="alert alert-danger">
                                    <strong>Danger!</strong> Enter a valid email
                                </div>
                                : ""}                             
                        </div>
                        <div className="form-group">
                            <label className="cols-sm-2 control-label">First name</label>
                                <div className="cols-sm-10">
								<div className="input-group">
                               
                                <input type="text"
                                    className={errors.firstName ? "error" : ""}
                                    value={this.props.firstName}
                                    onChange={this.handleInputChange('firstName')}
                                    onBlur={this.handleBlur('firstName')}
                                />
                                 </div>
                            </div>  
                            { errors.firstName
                                ? 
                                <div className="alert alert-danger">
                                    <strong>Danger!</strong> Enter a valid name
                                </div>
                                : ""}                            
                        </div>
                        <div className="form-group">
                            <label className="cols-sm-2 control-label">Last name</label>
                                <div className="cols-sm-10">
								<div className="input-group">
                               
                                <input type="text"
                                    className={errors.lastName ? "error" : ""}
                                    value={this.props.lastName}
                                    onChange={this.handleInputChange('lastName')}
                                    onBlur={this.handleBlur('lastName')}
                                />
                                 </div>
                            </div>  
                             { errors.lastName
                                ? 
                                <div className="alert alert-danger">
                                    <strong>Danger!</strong> Enter a valid name
                                </div>
                                : ""}                            
                        </div>
                        <input type="submit"
                            disabled={!isEnabled}
                            className="btn btn-danger" />
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}