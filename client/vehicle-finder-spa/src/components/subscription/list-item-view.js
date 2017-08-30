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
        const notseen = []
        this.props.notifications.forEach(function(element) {
            if(!notseen.includes(element.article) && subscriptionId === element.subscription
                && element.isSeen === false) {
                    notseen.push(element.article)
                }
        }, this);
            
        return notseen.length
    }

    render() {
        const listItems = this.props.subscriptions.map((subscription) =>
            <div className="row card">
            <Link to={{pathname: `/subscription/${subscription._id}`}}>

            <div className="col-md-6"> Title:{subscription.title}
            </div>
            <div className="col-md-2">
                <div> Year:({subscription.yearFrom}-{subscription.yearTo})</div>
            </div>
            <div className="col-md-2"> 
                <div> Price:({subscription.priceFrom}-{subscription.priceTo})</div>
            </div>
            <div className="col-md-2">
                <div className="col-md-6"> 
                {this.getCount(subscription._id)
                ? <div > {this.getCount(subscription._id)} new </div>
                :""
                }
                </div>
                <div className="col-md-6"> 
                <button className="btn btn-danger"
                    onClick={this.handleDelete.bind(this, subscription)}>
                    Delete
                </button>
                </div>
            </div>
            </Link> 
            </div>)

        return (
            <div>
                {listItems}
            </div>
        )
    }
}