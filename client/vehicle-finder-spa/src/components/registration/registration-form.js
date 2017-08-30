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
                    <div className="card card-container">
                    <h2 className='card-title text-center'>{this.props.heading}</h2>
                    
                        <form className="form-fill"
                            onSubmit={this.props.handleSubmit}>
                            <span id="reauth-email" className="reauth-email"></span>
                            <p className="input_title">Username</p>
                            <input type="text" id="inputEmail" className="text-box" placeholder="example" required autofocus 
                                value={this.props.username}
                                onChange={this.handleInputChange('username')}/>
                            <p className="input_title">Password</p>
                            <input type="password" id="inputPassword" className="text-box" placeholder="******" required 
                                value={this.props.password}
                                onChange={this.handleInputChange('password')}/>
                            <div id="remember" className="checkbox">
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
                            <button className="btn btn-lg btn-primary" type="submit" disabled={!isEnabled}>{this.props.heading} </button>
                        </form>
                    </div>
            </div>
        )
    }
}