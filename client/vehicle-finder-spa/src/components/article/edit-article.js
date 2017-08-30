import React, { Component } from 'react';
import {topFunction} from '../../utills/functions'

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
                    <div className="card card-container">
                    <h2 className='card-title text-center'>Article</h2>
                        <form className="form-fill"
                            onSubmit={this.props.handleSubmit}>
                            <p className="input_title">Title</p>
                            <input type="text"  className="text-box" placeholder="Renault Megane Scenic" required autofocus 
                                value={this.props.title}
                                onChange={this.handleInputChange('title')}/>
                            <p className="input_title">Desctiption</p>
                            <input type="text" className="text-box" placeholder="Detailed descriptiom" required autofocus 
                                value={this.props.body}
                                onChange={this.handleInputChange('body')}/>
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
                            <p className="input_title">Year</p>
                            <input type="number" className="text-box" placeholder="1999" required autofocus 
                                value={this.props.year}
                                onChange={this.handleInputChange('year')}/>
                            <p className="input_title">Price</p>
                            <input type="number" className="text-box" placeholder="5000" required autofocus 
                                value={this.props.price}
                                onChange={this.handleInputChange('price')}/>
                            <p className="input_title">Tags</p>
                            <input type="text" className="text-box" placeholder="2.0 4x4 new" autofocus 
                                value={this.props.tags}
                                onChange={this.handleInputChange('tags')}/>
                            <p className="input_title">Image URL</p>
                            <input type="text" className="text-box" placeholder="https://example.com/img.jpeg" autofocus 
                                value={this.props.imageUrl}
                                onChange={this.handleInputChange('imageUrl')}/>
                        
                            <button className="btn btn-lg btn-primary" type="submit" disabled={!isEnabled} onClick={topFunction}>Submit </button>
                        </form>
                    </div>
            </div> 
        )
    }
}