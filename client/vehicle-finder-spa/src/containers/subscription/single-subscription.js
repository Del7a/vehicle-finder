import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestNotifications, markAsSeen, requestAllSubscriptions } from '../../actions/subscription';
import { deleteArticle, getSingleArticle} from '../../actions/article'
import { Link } from 'react-router-dom';
import ArticleListComponent  from '../../components/article/list-item-view';
import { Redirect } from 'react-router'


class SingleSubscription extends Component {

    constructor(props) {
        super(props)

        this.handleArticleDelete = this.handleArticleDelete.bind(this)
        this.handleEditRequest = this.handleEditRequest.bind(this)
        this.getSeen = this.getSeen.bind(this)
        this.getUnseen = this.getUnseen.bind(this)
    }

    componentDidMount() {
        if (this.props.user.notifications.length === 0) {
            this.props.requestNotifications()
        }
        debugger
        console.log(this.props)
        if (this.props.subscription.subscriptions.length === 0) {
            this.props.requestAllSubscriptions()
        }
    }

    handleArticleDelete(ev, article) {
        this.props.deleteArticle(article)
    }

    handleEditRequest(articleId) {
        this.props.history.push(`/edit-article/${articleId}`)
    }

    getUnseen(notifications, subscriptionId) {
        const selected = notifications.filter((notification) => {
                if(notification.subscription === subscriptionId
                        && !notification.isSeen) {
                    return true 
                }
            }).map((articleId) => {
                return getSingleArticle(articleId)
            })
        return selected;
    }

    getSeen(notifications, subscriptionId) {
        const selected = notifications.filter((notification) => {
                if(notification.subscription === subscriptionId
                        && notification.isSeen) {
                    return true 
                }
            }).map((articleId) => {
                return getSingleArticle(articleId)
            })
        return selected;
    }

    render() {
        debugger
        console.log(this.props)
        const withNotification = this.getUnseen(this.props.user.notifications, 
                        this.props.subscription.currentSubscription._id)
        const withoutNotification = this.getSeen(this.props.user.notifications, 
                        this.props.subscription.currentSubscription._id)               
        return (
            <div>
                { withNotification.length
                ? <div>None</div>
                :
                <ArticleListComponent 
                    articles= {withNotification}
                    handleArticleDelete={this.handleArticleDelete}
                    handleEditRequest={this.handleEditRequest}
                    currentUserId={this.props.user.currentUserId}
                />}
                <hr></hr>
                { withoutNotification.length
                ? <div>None</div>
                :
                <ArticleListComponent 
                    articles= {withoutNotification}
                    handleArticleDelete={this.handleArticleDelete}
                    handleEditRequest={this.handleEditRequest}
                    currentUserId={this.props.user.currentUserId}
                />}

            </div>
        )
    }
}

function mapStateToProps({subscription, user}) {
    console.log(subscription)
    console.log(user)
    return {subscription, user};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ requestNotifications, markAsSeen,
                                deleteArticle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleSubscription);