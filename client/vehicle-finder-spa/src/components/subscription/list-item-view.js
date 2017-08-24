import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SubscriptionListComponent extends Component {

    constructor(propms) {
        super(propms)

        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(ev, subscription) {
        this.props.handleSubscriptionDelete(this.props.subscription, ev)
    }

    render() {
        const listItems = this.props.subscriptions.map((subscription) =>
            <li key={subscription._id}>

                <Link to={{pathname: `/subscription/${subscription._id}`}}>
                    {subscription.title} - ( {subscription.yearFrom} - {subscription.yearTo} ) - ( {subscription.priceFrom} - {subscription.priceTo} )
                </Link>
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