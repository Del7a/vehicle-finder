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
        <div className="bs-example">
        <Link to={{pathname: `/subscription/${subscription._id}`}}>
        <nav className="navbar navbar-default">
        <div className="navbar-header">
            <Link to={{pathname: `/subscription/${subscription._id}`}} className="navbar-brand">{subscription.title}</Link></div>
        <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">               
                <li><Link to={{pathname: `/subscription/${subscription._id}`}}>Year:{subscription.yearFrom}~{subscription.yearTo}</Link></li>
                <li><Link to={{pathname: `/subscription/${subscription._id}`}}>Price:{subscription.priceFrom}~{subscription.priceTo}</Link></li>
            </ul>
            <div>
            <form className="navbar-form navbar-right">
            <div className="input-group">
                <span className="input-group-btn">
                    <button type="button" 
                        onClick={this.handleDelete.bind(this, subscription)}
                        className="btn btn-danger">
                        Remove
                    </button>
                </span>
            </div>
        </form>
            <ul className="nav navbar-nav navbar-right">
                <li >
                    <Link to={{pathname: `/subscription/${subscription._id}`}}>
                    {this.getCount(subscription._id)
                     ?this.getCount(subscription._id)+" new notifications"
                     :""
                }</Link>
                </li>
            </ul> 
            </div>
        </div>
    </nav>
    </Link>
</div>)

        return (
            <div>
                {listItems}
            </div>
        )
    }
}