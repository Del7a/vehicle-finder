import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class ArticleListComponent extends Component {

    constructor(propms) {
        super(propms)

        this.handleDelete = this.handleDelete.bind(this)
        this.handleEditRequest = this.handleEditRequest.bind(this)
    }

    handleDelete(ev, articleId) {
        this.props.handleArticleDelete(this.props.makerId, ev)
    }

    handleEditRequest(articleId) {
        this.props.handleEditRequest(articleId)
    }

    render() {
        const listItems = this.props.articles.map((article) =>
            <li key={article._id}>
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
            </li>)

        return (
            <div>
                {listItems}
            </div>
        )
    }
}