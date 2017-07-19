import React, { Component } from 'react';

export default class Form extends Component {

    constructor(props) {
        super(props);
        
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
    }

    handleUserChange(event) {
        const newFormState = {username: event.target.value};
        this.props.formInputChanged(newFormState);
    }

    handlePassChange(event) {
        const newFormState = {password: event.target.value};
        this.props.formInputChanged(newFormState);
    }

    

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label>
                    User Name
                    <input type="text" value={this.props.username} onChange={this.handleUserChange} />
                </label>
                <label>
                    Password
                    <input type="text" value={this.props.password} onChange={this.handlePassChange} />
                </label>
                <input type="submit" />
            </form>
        )
    }
}