import React, { Component } from 'react';

export default class NewSubscriptionForm extends Component {  

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

    validate(title, yearFrom, yearTo, priceFrom, priceTo) {
        return {
            title: title !== undefined && title.length === 0,
            yearFrom: yearFrom !== undefined && yearFrom.length === 0,
            yearTo: yearTo !== undefined && yearTo.length === 0,
            priceFrom: priceFrom !== undefined && priceFrom.length === 0,
            priceTo: priceTo !== undefined && priceTo.length === 0,
        };
    }

    render() {
        const errors = this.validate(this.props.title, this.props.yearFrom, this.props.yearTo, this.props.priceFrom, this.props.priceTo);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);

        const makerDropDown = 
            <select onChange={this.onMakerChange}
                defaultValue='Blan'
                value={this.props.maker._id}
            >
                {this.props.makersList.map((maker) => 
                    <option key={maker._id} value={maker._id}>
                        {maker.name}
                    </option>
                )}
            </select>

        let curentMakerId = ''
        if(this.props.makersList.length > 0) {
            curentMakerId = this.props.makersList[0]._id
            if(!this.props.maker) {
                this.props.formInputChanged({maker: curentMakerId});
            }
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
                { this.props.currentInfoMessage
                ? 
                <div className="alert alert-success">
                    <strong>Success!</strong> {this.props.currentInfoMessage}
                </div>
                : ""}
                { this.props.currentErrorMessage
                ? 
                <div className="alert alert-danger">
                    <strong>Danger!</strong> {this.props.currentErrorMessage}
                </div>
                : ""}
                <div className="row main">
                    <div className="main-login main-center">
                        <form className="form-vertical"
                            onSubmit={this.props.handleSubmit}>
                            <div className="form-group">
                                <label className="cols-sm-2 control-label">Title</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <input type="text"
                                            value={this.props.title}
                                            onChange={this.handleInputChange('title')}
                                        />
                                    </div>
                                </div>                        
                            </div>
                            <div className="form-group">
                                <label className="cols-sm-2 control-label">Year from</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <input type="number" min="1900" max="2099" step="1"
                                            value={this.props.body}
                                            onChange={this.handleInputChange('yearFrom')}
                                        >
                                        </input>
                                    </div>
                                </div>                        
                            </div>
                            <div className="form-group">
                                <label className="cols-sm-2 control-label">Year to</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <input type="number" min="1900" max="2099" step="1"
                                            value={this.props.body}
                                            onChange={this.handleInputChange('yearTo')}
                                        >
                                        </input>
                                    </div>
                                </div>                        
                            </div>
                            <div className="form-group">
                                <label className="cols-sm-2 control-label">Price from</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <input type="number"
                                            value={this.props.body}
                                            onChange={this.handleInputChange('priceFrom')}
                                        >
                                        </input>
                                    </div>
                                </div>                        
                            </div>
                            <div className="form-group">
                                <label className="cols-sm-2 control-label">Price to</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <input type="number"
                                            value={this.props.body}
                                            onChange={this.handleInputChange('priceTo')}
                                        >
                                        </input>
                                    </div>
                                </div>                        
                            </div>
                            <div className="form-group">
                                <label className="cols-sm-2 control-label">Maker</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <input type="hidden"
                                            value={this.props.maker._id}
                                            onChange={this.handleInputChange('maker')} //onBlur={this.handleBlur('oldPassword')}
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
                                            value={this.props.model}
                                            onChange={this.handleInputChange('model')}
                                        />
                                        {modelDropDown}
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
