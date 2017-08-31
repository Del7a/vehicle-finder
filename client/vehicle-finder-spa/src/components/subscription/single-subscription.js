import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import defaultPictureSrc from './../../assets/images/default.jpg';
import SingleListItem from './../article/single-list-item';

export default class NotificationListComponent extends Component {

    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
        this.handleEditRequest = this.handleEditRequest.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    handleDelete(ev, articleId) {
        this.props.handleArticleDelete(this.props.makerId, ev)
    }

    handleEditRequest(articleId) {
        this.props.handleEditRequest(articleId)
    }

    onClick(article)
    {
        if (!article.seen) {
            this.props.markAsSeen(article._id)
        }
        this.props.setCurrentArticle(article)
    }

    render() {
        const listItems = this.props.articles.map((article) => {
            
            return <SingleListItem
                        article={article}
                        handleDelete={this.handleDelete}
                        handleEditRequest={this.handleEditRequest}
                        onClick={this.onClick}
                        currentUserId={this.props.currentUserId}
                    />

        })

        return (
            <div className="container">
                    {listItems}
            </div>
        )
    }
}