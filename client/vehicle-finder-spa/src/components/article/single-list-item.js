import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import defaultPictureSrc from './../../assets/images/default.jpg';

export default class SingleListItem extends Component {

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
       this.props.onClick(article)
    }

    render() {
        let imageSrc = defaultPictureSrc;
        if (this.props.article.imageUrl) {
            imageSrc = this.props.article.imageUrl
        }
        return (
                <li key={this.props.article._id} onClick={() => this.onClick(this.props.article)}>
                    <Link to={{pathname: `/article/${this.props.article._id}`}}>
                    <img className="offer-image" src={imageSrc} alt="Offer" />
                    
                        {this.props.article.title} - {this.props.article.year}
                    </Link>
                    {this.props.article.user.id === this.props.currentUserId?
                    <button
                        onClick={this.handleDelete.bind(this, this.props.article)}>
                        X
                    </button> : ''}
                    {this.props.article.user.id === this.props.currentUserId?
                    <button
                        onClick={this.handleEditRequest.bind(this, this.props.article._id)}>
                        Edit
                    </button> : ''}
                    {!this.props.article.seen?
                    <span className="glyphicon glyphicon-exclamation-sign"> </span> : ''
                    }
            </li>
        )
    }
}
