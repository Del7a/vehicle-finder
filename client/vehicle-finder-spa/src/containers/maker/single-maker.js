import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditMakerForm from '../../components/maker/edit-form';
import ModelListComponent from '../../components/model/model-list-view';
import { bindActionCreators } from 'redux';
import { requestSingleMaker, formChanged, updateMaker,
        createSingleMakers, deleteSingleModel } from '../../actions/maker';
import { Link } from 'react-router-dom';

import { Redirect } from 'react-router'


class SingleMaker extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formInputChanged = this.formInputChanged.bind(this);
        this.handleModelDelete = this.handleModelDelete.bind(this);
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            this.props.requestSingleMaker(this.props.match.params.id)
        }
    }

    handleSubmit(ev) {
        ev.preventDefault();
        if(this.props.match.params.id) {
            this.props.updateMaker(this.props.maker.currentMaker);
        } else {
            this.props.createSingleMakers(this.props.maker.currentMaker.name);
        }
    }

    handleModelDelete(makerId, modelId) {
        this.props.deleteSingleModel(makerId, modelId)
    }

    formInputChanged(newFormState) {
        this.props.formChanged(newFormState);
    }


    render(){
        // const redirAfterLogin = this.props.user.isLoggedIn ? 
        //    <Redirect to={'/home'}/>
        // : '';

        // const ErrorMessage = this.props.maker.currentErrorMessage ? 
 
        //     <div className="alert alert-danger">
        //         <strong>Danger!</strong> {this.props.maker.currentErrorMessage}
        //     </div>
        //     : "";

        // const InfoMessage = this.props.maker.currentInfoMessage ? 

        //     <div className="alert alert-warning">
        //         <strong>Warning!</strong> {this.props.maker.currentInfoMessage}
        //     </div>
        //     : "";
       

        const form = this.props.maker.isFetching ?
        <div> Носи се! </div>
        :
        <EditMakerForm
            currentMakerName={this.props.maker.currentMaker.name}
            currentMakerId={this.props.maker.currentMaker._id}
            formInputChanged={this.formInputChanged}
            handleSubmit={this.handleSubmit} />

        const addModel = <Link to={ `/model/${this.props.maker.currentMaker._id}/0` }
                    className="btn btn-success">Add model
                </Link>

        console.log(this.props.maker.currentMaker.models)

        const modelsForCurrentMakersModels = 
            <ModelListComponent
                models={this.props.maker.currentMaker.models}
                makerId={this.props.maker.currentMaker._id}
                handleModelDelete={this.handleModelDelete}
            />

    return(
        <div>
            <h1>Sigle maker</h1>
             {/* <h1>{ErrorMessage}</h1> 
             <h1>{InfoMessage}</h1>  */}
            <div>{form}</div>
            <div>{addModel}</div>
            <div> List of models </div>
            <div> {modelsForCurrentMakersModels} </div>
            {/* <div>{redirAfterLogin}</div> */}
        </div>
    )}
    
}

function mapStateToProps({maker}) {
    console.log(maker)
    return {maker};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({formChanged, requestSingleMaker,
        updateMaker, createSingleMakers,
        deleteSingleModel}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleMaker);