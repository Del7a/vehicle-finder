import React, { Component } from 'react';

export default class Form extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            touched: {
                oldPassword: false,
                newPassword: false,
                newPasswordRepeat: false,
                passWordMatch: false
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
                            <label className="cols-sm-2 control-label">Old Password</label>
                                <div className="cols-sm-10">
								<div className="input-group">
                               
                                <input type="password"
                                    className={errors.oldPassword ? "error" : ""}
                                    value={this.props.oldPassword}
                                    onChange={this.handleInputChange('oldPassword')}
                                    onBlur={this.handleBlur('oldPassword')}
                                />
                                 </div>
                            </div>   
                            { this.props.passwordChanged
                                ? 
                                <div className="alert alert-success">
                                    <strong>Success!</strong> Password changed
                                </div>
                                : ""}  
                            { this.props.passwordChangeError
                                ? 
                                <div className="alert alert-danger">
                                    <strong>Error!</strong> {this.props.currentErrorMessage}
                                </div>
                                : ""}                         
                        </div>        
                         <div className="form-group">
                            <label className="cols-sm-2 control-label">New Password</label>
                                <div className="cols-sm-10">
								<div className="input-group">
                               
                                <input type="password"
                                    className={errors.newPassword ? "error" : ""}
                                    value={this.props.newPassword}
                                    onChange={this.handleInputChange('newPassword')}
                                    onBlur={this.handleBlur('newPassword')}
                                />
                                 </div>
                            </div>                            
                        </div>
                        <div className="form-group">
                            <label className="cols-sm-2 control-label">Repeat Password</label>
                                <div className="cols-sm-10">
								<div className="input-group">
                               
                                <input type="password"
                                    className={errors.newPasswordRepeat ? "error" : ""}
                                    value={this.props.newPasswordRepeat}
                                    onChange={this.handleInputChange('newPasswordRepeat')}
                                    onBlur={this.handleBlur('newPasswordRepeat')}
                                />
                                { this.props.newPassword !== this.props.newPasswordRepeat
                                    ? 
                                    <div className="alert alert-danger">
                                        Dont match
                                    </div>
                                : ""}   
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