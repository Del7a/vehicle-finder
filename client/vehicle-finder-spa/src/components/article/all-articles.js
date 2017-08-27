import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SingleListItem from './single-list-item';

export default class ArticleListComponent extends Component {

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

    onClick(article) {
        this.props.onClick(article)
    }

    render() {
        const listItems = this.props.articles.map((article) =>
            <SingleListItem
                article={article}
                handleDelete={this.handleDelete}
                handleEditRequest={this.handleEditRequest}
                onClick={this.props.onClick}
                currentUserId={this.props.currentUserId}
            />)


        return (
            <div className="container">
            <div className="row">
		    <div className="well">
            <h1 className="text-center">Vote for your favorite</h1>
            <div className="list-group">
            <div>
                {listItems}
            </div></div></div></div></div>
        )
    }
}