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

    handleDelete(article) {
        this.props.handleArticleDelete(article)
    }

    handleEditRequest(articleId) {
        this.props.handleEditRequest(articleId)
    }

    onClick(article) {
        this.props.onClick(article)
    }

    render() {
        const listItems = this.props.articles.map((article) =>
            <SingleListItem key={article._id}
                article={article}
                handleDelete={this.handleDelete}
                handleEditRequest={this.handleEditRequest}
                onClick={this.props.onClick}
                currentUserId={this.props.currentUserId}
                modelAndMakerStrings={this.props.modelAndMakerStrings}
                isAdmin={this.props.isAdmin}
            />)


        return (
            <div className="container article-container">
                {listItems}
            </div>
        )
    }
}