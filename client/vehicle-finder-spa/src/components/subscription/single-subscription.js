import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class NotificationListComponent extends Component {

    constructor(propms) {
        super(propms)

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
        if(!article.seen) {
            this.props.markAsSeen(article._id)
        }
        this.props.setCurrentArticle(article)
    }

    render() {
        const listItems = this.props.articles.map((article) =>
            <li key={article._id} onClick={() => this.onClick(article)}>
                <Link to={{pathname: `/article/${article._id}`}}>
                    {article.title} - {article.year}
                </Link>
                {article.user.id === this.props.currentUserId?
                <button
                    onClick={this.handleDelete.bind(this, article)}>
                    X
                </button> : ''}
                {article.user.id === this.props.currentUserId?
                <button
                    onClick={this.handleEditRequest.bind(this, article._id)}>
                    Edit
                </button> : ''}
                {!article.seen?
                <span className="glyphicon glyphicon-exclamation-sign"> </span> : ''
                }
            </li>)

        return (
            <div>
                {listItems}
            </div>
        )
    }
}