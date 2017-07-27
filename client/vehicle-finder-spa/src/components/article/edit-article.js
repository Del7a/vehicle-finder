import React, { Component } from 'react';

export default class EditArticleForm extends Component {  

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
                        <form className="form-vertical"
                            onSubmit={this.props.handleSubmit}>
                            <div className="form-group">
                                <label className="cols-sm-2 control-label">Title</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <input type="text"
                                            //className={errors.oldPassword ? "error" : ""}
                                            value={this.props.title}
                                            onChange={this.handleInputChange('title')}
                                            //onBlur={this.handleBlur('oldPassword')}
                                        />
                                    </div>
                                </div>                        
                            </div>
                            <div className="form-group">
                                <label className="cols-sm-2 control-label">Body</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <textarea type="text"
                                            //className={errors.oldPassword ? "error" : ""}
                                            value={this.props.body}
                                            onChange={this.handleInputChange('body')}
                                            //onBlur={this.handleBlur('oldPassword')}
                                        >
                                        </textarea>
                                    </div>
                                </div>                        
                            </div>
                            <div className="form-group">
                                <label className="cols-sm-2 control-label">Maker</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <input type="text"
                                            //className={errors.oldPassword ? "error" : ""}
                                            value={this.props.maker}
                                            onChange={this.handleInputChange('maker')}
                                            //onBlur={this.handleBlur('oldPassword')}
                                        />
                                    </div>
                                </div>                        
                            </div>
                            <div className="form-group">
                                <label className="cols-sm-2 control-label">Model</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <input type="text"
                                            //className={errors.oldPassword ? "error" : ""}
                                            value={this.props.model}
                                            onChange={this.handleInputChange('model')}
                                            //onBlur={this.handleBlur('oldPassword')}
                                        />
                                    </div>
                                </div>                        
                            </div>
                            <div className="form-group">
                                <label className="cols-sm-2 control-label">Year</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <input type="text"
                                            //className={errors.oldPassword ? "error" : ""}
                                            value={this.props.year}
                                            onChange={this.handleInputChange('year')}
                                            //onBlur={this.handleBlur('oldPassword')}
                                        />
                                    </div>
                                </div>                        
                            </div>
                            <div className="form-group">
                                <label className="cols-sm-2 control-label">Tags</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <input type="text"
                                            //className={errors.oldPassword ? "error" : ""}
                                            value={this.props.tags}
                                            onChange={this.handleInputChange('tags')}
                                            //onBlur={this.handleBlur('oldPassword')}
                                        />
                                    </div>
                                </div>                        
                            </div>
                            <div className="form-group">
                                <label className="cols-sm-2 control-label">url</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <input type="text"
                                            //className={errors.oldPassword ? "error" : ""}
                                            value={this.props.url}
                                            onChange={this.handleInputChange('url')}
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