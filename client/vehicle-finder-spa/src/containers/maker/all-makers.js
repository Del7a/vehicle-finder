import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestMakers, formChanged, createSingleMaker, deleteSingleMaker } from '../../actions/maker';
import MakersListComponent from '../../components/maker/maker-list-item'
import NewMakerForm from "../../components/maker/new-maker"

import { Link } from 'react-router-dom';

import { Redirect } from 'react-router'


class AllMakers extends Component {

    constructor(props) {
        super(props);
        this.formInputChanged = this.formInputChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.requestMakers()
    }

    handleDelete(makerId) {
        this.props.deleteSingleMaker(makerId)
    }

    handleSubmit(ev) {
        debugger
        ev.preventDefault();
        this.props.createSingleMaker(this.props.maker.currentMaker.name);
        console.log(this.props)
        debugger
    }

    formInputChanged(newFormState) {
        this.props.formChanged(newFormState);
    }

    render() {   

    return(
        <div>
        <NewMakerForm
        formInputChanged={this.formInputChanged}
        handleSubmit={this.handleSubmit} 
        currentInfoMessage={this.props.maker.currentInfoMessage}
        currentErrorMessage={this.props.maker.currentErrorMessage}/>

        <div className="modal-body row">
            <MakersListComponent
                makers={this.props.maker.makers}
                onHandleDelete={this.handleDelete}
            />
        </div>
        </div>
    )}
    
}

function mapStateToProps({maker}) {
    console.log(maker)
    return {maker};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ requestMakers, formChanged, createSingleMaker, deleteSingleMaker }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMakers);