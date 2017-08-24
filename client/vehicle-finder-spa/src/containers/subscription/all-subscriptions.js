import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestAllSubscriptions, deleteSubscription } from '../../actions/subscription';
import { Link } from 'react-router-dom';
import SubscriptionListComponent  from '../../components/subscription/list-item-view';
import { Redirect } from 'react-router'


class AllSubscriptions extends Component {

    constructor(props) {
        super(props)
        this.handleSubscriptionDelete = this.handleSubscriptionDelete.bind(this)
    }

    componentDidMount() {
        if (this.props.subscription.allSubscriptions.length === 0) {
            this.props.requestAllSubscriptions()
        }
    }

    handleSubscriptionDelete(ev, subscription) {
        this.props.deleteSubscription(subscription._id)
    }

    render() {
    console.log(this.props.subscription)

        return (
            <div>
                <Link to='/create-subscription'>
                    Create subscription
                </Link>
                {!this.props.subscription.allSubscriptions.length
                ? <div>None</div>
                :
                <SubscriptionListComponent 
                    subscriptions={this.props.subscription.allSubscriptions}
                    handleSubscriptionDelete={this.handleSubscriptionDelete}
                />}
            </div>
        )
    }
}

function mapStateToProps({subscription}) {
    console.log(subscription)
    return {subscription};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ requestAllSubscriptions,
                                deleteSubscription }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSubscriptions);