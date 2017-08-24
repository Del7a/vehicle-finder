import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SubscriptionListComponent extends Component {

    constructor(propms) {
        super(propms)

        this.handleDelete = this.handleDelete.bind(this)
        this.getCount = this.getCount.bind(this)
    }

    handleDelete(ev, subscription) {
        this.props.handleSubscriptionDelete(this.props.subscription, ev)
    }

    getCount(subscriptionId)
    {
        const unseen = this.props.notifications.filter((notification) => {
                if(subscriptionId === notification.subscription && !notification.isSeen) {
                    return true;
                }
            })
        return unseen.length
    }

    render() {
        const listItems = this.props.subscriptions.map((subscription) =>
            <li key={subscription._id}>

                <Link to={{pathname: `/subscription/${subscription._id}`}}>
                    {subscription.title} - ( {subscription.yearFrom} - {subscription.yearTo} ) - ( {subscription.priceFrom} - {subscription.priceTo} )
                </Link>
                {this.getCount(subscription._id)
                ? <span> {this.getCount(subscription._id)} new notification/s </span>
                :""
                }
                <button
                    onClick={this.handleDelete.bind(this, subscription)}>
                    X   
                </button>
            </li>)

        return (
            <div>
                {listItems}
            </div>
        )
    }
}