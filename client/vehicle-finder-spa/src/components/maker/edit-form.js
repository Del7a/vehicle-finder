import React, { Component } from 'react';

export default class EditMakerForm extends Component {  

    handleInputChange = (field) => evt =>{
        const newFormState = {[field]: evt.target.value};
        this.props.formInputChanged(newFormState);
        //this.handleBlur(field);
    }


    render() {
        return (
         <div className="container">
                <div className="row main">
                    <div className="main-login main-center">
                    <form className="form-horizontal"
                    onSubmit={this.props.handleSubmit}>
                    <div className="form-group">
                            <label className="cols-sm-2 control-label">Maker</label>
                                <div className="cols-sm-10">
								<div className="input-group">
                               
                               <input type="text" value={this.props.currentMakerId} />
                                <input type="text"
                                    //className={errors.oldPassword ? "error" : ""}
                                    value={this.props.currentMakerName}
                                    onChange={this.handleInputChange('currentMakerName')}
                                    //onBlur={this.handleBlur('oldPassword')}
                                />
                                 </div>
                            </div>                            
                        </div>
                        
                        <input type="submit"
                            //disabled={!isEnabled}
                            className="btn btn-danger" />
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}