import React, { Component } from 'react';

export default class Form extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            touched: {
                username: false,
                password: false,
            }
        };

        this.validate = this.validate.bind(this);
    }

    validate(username, password) {
        // true means invalid, so our conditions got reversed
        return {
            username: username !== undefined && username.length === 0,
            password: password !== undefined && password.length === 0,
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
        const errors = this.validate(this.props.username, this.props.password);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);


        return (
            <div className="container">
                <div className="row main">
                    <div className="main-login main-center">
                    <form className="form-horizontal"
                    onSubmit={this.props.handleSubmit}>
                        <div className="form-group">
                            <label className="cols-sm-2 control-label"> User Name </label>
                                <div className="cols-sm-10">
								<div className="input-group">
                                    <input type="text" 
                                        className={errors.username ? "error" : ""}
                                        value={this.props.username}
                                        onChange={this.handleInputChange('username')}
                                        onBlur={this.handleBlur('username')}
                                    />
                                </div>
                            </div>
                            { this.props.usernameTaken
                                ? 
                                <div className="alert alert-danger">
                                    <strong>Name already taken!</strong>
                                </div>
                                : ""}
                            { this.props.loginFailed
                                ? 
                                <div className="alert alert-danger">
                                    <strong>Incorrect username or password!</strong>
                                </div>
                                : ""}
                            </div>
                         <div className="form-group">
                            <label className="cols-sm-2 control-label">Password</label>
                                <div className="cols-sm-10">
								<div className="input-group">
                               
                                <input type="password"
                                    className={errors.password ? "error" : ""}
                                    value={this.props.password}
                                    onChange={this.handleInputChange('password')}
                                    onBlur={this.handleBlur('password')}
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