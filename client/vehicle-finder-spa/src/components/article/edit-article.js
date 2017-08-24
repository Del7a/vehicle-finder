import React, { Component } from 'react';

export default class EditArticleForm extends Component {  

    constructor(props) {
        super(props)

        this.onMakerChange = this.onMakerChange.bind(this)
        this.onModelChange = this.onModelChange.bind(this)
    }

    handleInputChange = (field) => evt =>{
        const newFormState = {[field]: evt.target.value};
        this.props.formInputChanged(newFormState);
    }

    onMakerChange(ev) {
        console.log(ev.target.value)
        this.handleInputChange('maker')(ev)
    }

    onModelChange(ev) {
        console.log(ev.target.value)
        this.handleInputChange('model')(ev)
    }

    validate(title, body, year, price) {
        return {
            title: title !== undefined && title.length === 0,
            body: body !== undefined && title.body === 0,
            year: year !== undefined && year.length === 0,
            price: price !==undefined && price.length ===0
          };
    }

    render() {
        const errors = this.validate(this.props.title, this.props.body, this.props.year, this.props.price);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);


        const makerDropDown = 
            <select onChange={this.onMakerChange}
                value={this.props.maker._id}
            >
                {this.props.makersList.map((maker) => 
                    <option key={maker._id} value={maker._id}>
                        {maker.name}
                    </option>
                )}
            </select>

       let curentMakerId = this.props.maker
        if(this.props.makersList.length > 0 && !this.props.maker) {
            curentMakerId = this.props.makersList[0]._id
            this.props.formInputChanged({maker: curentMakerId});
        }

        const currentMaker = this.props.makersList.filter(function(el){
            return el._id === curentMakerId
        })

        let currentMakersModels = [];

        if (currentMaker.length > 0) {
            currentMakersModels = currentMaker[0].models
            if(!this.props.model && currentMakersModels.length) {
                this.props.formInputChanged({model: currentMakersModels[0]._id});
            }
        }
        const modelDropDown = 
            <select onChange={this.onModelChange}
                value={this.props.model}>
                {currentMakersModels.map((model) => 
                    <option key={model._id} value={model._id}>
                        {model.name}
                    </option>
                )}
            </select>


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
                                        <input type="hidden"
                                            //className={errors.oldPassword ? "error" : ""}
                                            value={this.props.maker._id}
                                            onChange={this.handleInputChange('maker')}
                                            //onBlur={this.handleBlur('oldPassword')}
                                        />
                                        {makerDropDown}
                                    </div>
                                </div>                        
                            </div>
                            <div className="form-group">
                                <label className="cols-sm-2 control-label">Model</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <input type="hidden"
                                            //className={errors.oldPassword ? "error" : ""}
                                            value={this.props.model}
                                            onChange={this.handleInputChange('model')}
                                            //onBlur={this.handleBlur('oldPassword')}
                                        />
                                        {modelDropDown}
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
                                <label className="cols-sm-2 control-label">Price</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <input type="text"
                                            //className={errors.oldPassword ? "error" : ""}
                                            value={this.props.price}
                                            onChange={this.handleInputChange('price')}
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
                                            value={this.props.imageUrl}
                                            onChange={this.handleInputChange('imageUrl')}
                                            //onBlur={this.handleBlur('oldPassword')}
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