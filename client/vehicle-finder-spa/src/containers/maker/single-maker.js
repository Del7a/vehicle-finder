import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditModelForm from '../../components/model/edit-form'
import EditMakerForm from '../../components/maker/edit-form';
import ModelListComponent from '../../components/model/model-list-view';
import { bindActionCreators } from 'redux';
import { requestSingleMaker, formChanged, modelFormChanged, updateMaker, 
        createSingleModel, deleteSingleModel } from '../../actions/maker';
import { Link } from 'react-router-dom';

import { Redirect } from 'react-router'


class SingleMaker extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitMaker = this.handleSubmitMaker.bind(this);
        this.handleSubmitModel = this.handleSubmitModel.bind(this);
        this.formInputChangedMaker = this.formInputChangedMaker.bind(this);
        this.formInputChangedModel = this.formInputChangedModel.bind(this);
        this.handleModelDelete = this.handleModelDelete.bind(this);
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            this.props.requestSingleMaker(this.props.match.params.id)
        }
    }

    handleSubmitMaker(ev) {
        ev.preventDefault();
        this.props.updateMaker(this.props.maker.currentMaker);
    }

    handleSubmitModel(ev) {
        ev.preventDefault();
        debugger
        this.props.createSingleModel(this.props.match.params.id,
                    this.props.maker.currentModelName);
    }

    handleModelDelete(makerId, modelId) {
        this.props.deleteSingleModel(makerId, modelId)
    }

    formInputChangedMaker(newFormState) {
        this.props.formChanged(newFormState);
    }

    formInputChangedModel(newFormState) {
        this.props.modelFormChanged(newFormState);
    }

    render(){    

        const form = <EditMakerForm
            currentMakerName={this.props.maker.currentMaker.name}
            currentMakerId={this.props.maker.currentMaker._id}
            formInputChanged={this.formInputChangedMaker}
            handleSubmit={this.handleSubmitMaker} 
            currentInfoMessage={this.props.maker.currentInfoMessage}
            currentErrorMessage={this.props.maker.currentErrorMessage}/>

        const addModel = <EditModelForm
                currentModelName={this.props.maker.currentModelName}
                formInputChanged={this.formInputChangedModel}
                handleSubmit={this.handleSubmitModel} 
                currentInfoMessage={this.props.maker.currentInfoMessage}
                currentErrorMessage={this.props.maker.currentErrorMessage}/>

        const modelsForCurrentMakersModels = 
            <ModelListComponent
                models={this.props.maker.currentMaker.models}
                makerId={this.props.maker.currentMaker._id}
                handleModelDelete={this.handleModelDelete}
            />

    return(
        <div>
            <div>{form}</div>
            <div>{addModel}</div>
            <div> {modelsForCurrentMakersModels} </div>
        </div>
    )}
    
}

function mapStateToProps({maker}) {
    console.log(maker)
    return {maker};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({formChanged, modelFormChanged, requestSingleMaker,
        createSingleModel, updateMaker, deleteSingleModel}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleMaker);