import React, { Component } from 'react';

export default class Form extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            touched: {
                username: false,
                lastName: false,
                firstName: false,
                email: false
            }
        };

        this.validate = this.validate.bind(this);
    }

    validate(oldPassword, newPassword, newPasswordRepeat) {
        // true means invalid, so our conditions got reversed
        return {
            oldPassword: oldPassword !== undefined && oldPassword.length === 0,
            newPassword: newPassword !== undefined && newPassword.length === 0,
            newPasswordRepeat: newPasswordRepeat !== undefined && newPasswordRepeat.length === 0,
            passWordMatch: newPassword !== newPasswordRepeat
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
        const errors = this.validate(this.props.oldPassword,
                this.props.newPassword, this.props.newPasswordRepeat);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);


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
                               
                                <input type="text"
                                    readOnly={true}
                                    className={errors.email ? "error" : ""}
                                    value={this.props.email}
                                    onChange={this.handleInputChange('email')}
                                    onBlur={this.handleBlur('email')}
                                />
                                 </div>
                            </div>                            
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