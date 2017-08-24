import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NewSubscriptionForm  from '../../components/subscription/new-subscription';
import { createSubscription, updateForm } from '../../actions/subscription';
import { requestMakers } from '../../actions/maker'
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router';


class NewSubscription extends Component {

    constructor(props) {
        super(props)

        this.onInputFormChange = this.onInputFormChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if(this.props.maker.makers.length === 0) {
            this.props.requestMakers()
        }
    }

    onInputFormChange(ev) {
        console.log(ev)
        this.props.updateForm(ev)
    }
    
    handleSubmit(ev) {
        ev.preventDefault()
        this.props.createSubscription(this.props.subscription.currentSubscription)
    }

    render(){
        const form = 
            <NewSubscriptionForm
              title={this.props.subscription.currentSubscription.title}
              yearFrom={this.props.subscription.currentSubscription.yearFrom}
              yearTo={this.props.subscription.currentSubscription.yearFrom}
              priceFrom={this.props.subscription.currentSubscription.priceFrom}
              priceTo={this.props.subscription.currentSubscription.priceTo}
              maker={this.props.subscription.currentSubscription.maker}
              model={this.props.subscription.currentSubscription.model}
              makersList={this.props.maker.makers}
              formInputChanged={this.onInputFormChange}
              handleSubmit={this.handleSubmit}
              currentInfoMessage={this.props.subscription.currentInfoMessage}
              currentErrorMessage={this.props.subscription.currentErrorMessage}
             />

    return(
        <div>
            <h1>Subscribe</h1>
            <div>{form}</div>
        </div>
    )}
}

function mapStateToProps({subscription, maker}) {
    console.log(subscription)
    console.log(maker)
    
    return {subscription, maker};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({createSubscription, updateForm,
                                requestMakers}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSubscription);