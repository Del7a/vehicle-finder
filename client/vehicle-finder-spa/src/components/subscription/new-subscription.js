import React, { Component } from 'react';
import { topFunction } from '../../utills/functions'

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
        <select className='fill-box text-box' onChange={this.onMakerChange}
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
        <select className='fill-box text-box' onChange={this.onModelChange}
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
                <h2 className='card-title text-center'>Subscription</h2>
                    <form className="form-fill"
                        onSubmit={this.props.handleSubmit}>
                        <p className="input_title">Title</p>
                        <input type="text"  className="text-box" placeholder="example title" required autofocus 
                            value={this.props.title}
                            onChange={this.handleInputChange('title')}/>
                        <p className="input_title">Maker</p>
                        <input type="hidden" required autofocus 
                            value={this.props.maker._id}
                            onChange={this.handleInputChange('maker')}/>
                            {makerDropDown}
                        <p className="input_title">Model</p>
                        <input type="hidden" required autofocus 
                            value={this.props.model._id}
                            onChange={this.handleInputChange('model')}/>
                            {modelDropDown}

                        <p className="input_title">Year from</p>
                        <input type="number" className="text-box" placeholder="1999" 
                            min="1900" max="2099" step="1" required autofocus 
                            value={this.props.yearFrom}
                            onChange={this.handleInputChange('yearFrom')}/>

                        <p className="input_title">Year to</p>
                        <input type="number" className="text-box" placeholder="2005" 
                            min="1900" max="2099" step="1" required autofocus 
                            value={this.props.yearTo}
                            onChange={this.handleInputChange('yearTo')}/>

                        <p className="input_title">Price from</p>
                        <input type="number" className="text-box" placeholder="2000" autofocus 
                            value={this.props.priceFrom}
                            onChange={this.handleInputChange('priceFrom')}/>

                        <p className="input_title">Price to</p>
                        <input type="number" className="text-box" placeholder="3000" autofocus 
                            value={this.props.priceTo}
                            onChange={this.handleInputChange('priceTo')}/>
                    
                        <button className="btn btn-lg btn-primary" type="submit" disabled={!isEnabled} onClick={topFunction}>Submit </button>
                    </form>
                </div>
        </div> 
    )
    }
}
