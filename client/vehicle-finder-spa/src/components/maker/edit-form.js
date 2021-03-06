import React, { Component } from 'react';

export default class EditMakerForm extends Component {  

    handleInputChange = (field) => evt =>{
        const newFormState = {[field]: evt.target.value};
        this.props.formInputChanged(newFormState);
    }


    render() {
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
                <strong>Danger!</strong> {this.props.currentErrorMessage}
            </div>
            : ""}
            <div className="card card-container">
            <h2 className='card-title text-center'>Edit maker name</h2>
                <form className="form-fill"
                    onSubmit={this.props.handleSubmit}>
                    <p className="input_title">Maker name</p>
                    <input type="text"  className="text-box" placeholder="example model" required autofocus 
                        value={this.props.currentMakerName}
                        onChange={this.handleInputChange('currentMakerName')}/>
                    <button className="btn btn-lg btn-primary" type="submit" >Edit </button>
                </form>
            </div>
        </div>
        )
    }
}