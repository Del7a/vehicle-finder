import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestNotifications, markAsSeen, getNotificationArticle, getNotificationArticleReset } from '../../actions/subscription';
import { setCurrentArticle, deleteArticle } from '../../actions/article'
import { Link } from 'react-router-dom';
import NotificationListComponent  from '../../components/subscription/single-subscription';
import { Redirect } from 'react-router'


class SingleSubscription extends Component {

    constructor(props) {
        super(props)

        this.state = {areNotifsLoaded: false, notifRequested: false}

        this.handleArticleDelete = this.handleArticleDelete.bind(this)
        this.handleEditRequest = this.handleEditRequest.bind(this)
        this.requestAllArticles = this.requestAllArticles.bind(this)
        this.handleMarkAsSeen = this.handleMarkAsSeen.bind(this)
        this.updateAcrticles = this.updateAcrticles.bind(this)
        this.setCurrentArticle = this.setCurrentArticle.bind(this)
    }

    componentDidMount() {
        if (!this.props.subscription.notifications.length && !this.state.notifRequested) {
            this.setState({notifRequested: true})
            this.props.requestNotifications()
        }

        if (this.props.subscription.notifArticles.length) {
            this.props.getNotificationArticleReset()
        }    

        this.updateAcrticles()
    }

    componentDidUpdate() {
        this.updateAcrticles()
    }

    updateAcrticles() {
        if (this.props.subscription.notifications.length > 0 && !this.state.areNotifsLoaded) {
            this.setState({areNotifsLoaded: true})
            this.requestAllArticles(this.props.subscription.notifications, this.props.match.params.id)
        }
    }

    handleArticleDelete(ev, article) {
        this.props.deleteArticle(article)
    }

    handleEditRequest(articleId) {
        this.props.history.push(`/edit-article/${articleId}`)
    }

    requestAllArticles(notification, subscriptionId) {
        const requestedArticles = [];
        
        for(let i = 0; i < notification.length; i++) {
            if(notification[i].subscription === subscriptionId 
                && !requestedArticles.includes(notification[i].article)
            ) {
                requestedArticles.push(notification[i].article)
                
                const newArticlesCount = this.notSeen = notification.filter((n =>
                    n.article === notification[i].article &&
                    n.subscription === notification[i].subscription &&
                    !n.isSeen
                )).length;
                
                this.props.getNotificationArticle(notification[i].article, !newArticlesCount)
            }
        }
    }

    checkArticleIn

    handleMarkAsSeen(articleId) {
        var articles = this.props.subscription.notifications.filter((notif) => {
            return notif.article === articleId
        });
        if (articles.length) {
            articles.forEach(function(element) {
                this.props.markAsSeen(element)
            }, this);
        }
    }

    setCurrentArticle(article) {
        this.props.setCurrentArticle(article)
    }

    render() {
        const notifs = this.props.subscription.notifications;
        debugger
        return (
            <div>
                <input type="hidden" value={notifs.length} />
                { !this.props.subscription.notifArticles.length
                ? <div>None</div>
                :
                <NotificationListComponent 
                    articles= {this.props.subscription.notifArticles}
                    modelAndMakerStrings={this.props.maker.makersAndModelsString}
                    handleArticleDelete={this.handleArticleDelete}
                    handleEditRequest={this.handleEditRequest}
                    currentUserId={this.props.user.currentUserId}
                    markAsSeen={this.handleMarkAsSeen}
                    setCurrentArticle={this.setCurrentArticle}
                />}
                <hr></hr>

            </div>
        )
    }
}

function mapStateToProps({subscription, user, maker}) {
    console.log(subscription)
    return {subscription, user, maker};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ requestNotifications, markAsSeen,
                                deleteArticle, setCurrentArticle, getNotificationArticle,
                                getNotificationArticleReset }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleSubscription);