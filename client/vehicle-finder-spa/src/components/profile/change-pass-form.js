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
                { this.props.passwordChanged
                    ? 
                    <div className="alert alert-success info-message">
                        <strong>Success!</strong> Password changed
                    </div>
                    : ""}  
                { this.props.passwordChangeError
                    ? 
                    <div className="alert alert-danger info-message">
                        <strong>Error!</strong> {this.props.currentErrorMessage}
                    </div>
                    : ""}
                <div className="card card-container">
                <h2 className='card-title text-center'>Change password</h2>
                    <form className="form-fill"
                        onSubmit={this.props.handleSubmit}>
                        <p className="input_title">Old password</p>
                            <input type="password" className="text-box" placeholder="*****" required autofocus 
                                value={this.props.oldPassword}
                                onChange={this.handleInputChange('oldPassword')}/> 

                        <p className="input_title">New password</p>
                            <input type="password" className="text-box" placeholder="******" required autofocus 
                                value={this.props.newPassword}
                                onChange={this.handleInputChange('newPassword')}/> 
                        
                        <p className="input_title">Repeat password</p>
                            <input type="password" className="text-box" placeholder="******" required autofocus 
                                value={this.props.newPasswordRepeat}
                                onChange={this.handleInputChange('newPasswordRepeat')}/> 
                                { this.props.newPassword !== this.props.newPasswordRepeat
                                    ? 
                                    <div className="alert alert-danger">
                                        Dont match
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