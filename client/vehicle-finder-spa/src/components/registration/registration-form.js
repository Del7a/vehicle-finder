import React, { Component } from 'react';

export default class Form extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            touched: {
                email: false,
                password: false,
            }
        };

        this.validate = this.validate.bind(this);
    }

    validate(email, password) {
        // true means invalid, so our conditions got reversed
        return {
            email: email !== undefined && email.length === 0,
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
        const errors = this.validate(this.props.email, this.props.password);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);


        return (
            <form onSubmit={this.props.handleSubmit}>
                <label>
                    User Name
                    <input type="text" 
                        className={errors.username ? "error" : ""}
                        value={this.props.username}
                        onChange={this.handleInputChange('username')}
                        onBlur={this.handleBlur('username')}
                    />
                </label>
                { this.props.usernameTaken 
                    ? <span className="error">Name already taken</span> 
                    : ""}
                <label>
                    Password
                    <input type="text"
                        className={errors.password ? "error" : ""}
                        value={this.props.password}
                        onChange={this.handleInputChange('password')}
                        onBlur={this.handleBlur('password')}
                    />
                </label>
                <input type="submit" disabled={!isEnabled} />
            </form>
        )
    }
}