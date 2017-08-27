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
                    <div className="list-group-item active">
                        <div class="media col-md-3">
                            <figure className="pull-left">
                                <img className="media-object img-rounded img-responsive" src={imageSrc} alt="Offer" />
                            </figure>
                        </div>
                        <div className="col-md-6">
                            <h4 className="list-group-item-heading"> {this.props.article.title} </h4>
                            <p className="list-group-item-text"> {this.props.article.year} </p>
                        </div>
                        <div className="col-md-3 text-center">
                            <h2> 14240 <small> votes </small></h2>
                            <button type="button" class="btn btn-default btn-lg btn-block"> Vote Now! </button>
                            <div class="stars">
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star"></span>
                        <span class="glyphicon glyphicon-star-empty"></span>
                    </div>
                    <p> Average 4.5 <small> / </small> 5 </p>
                        </div>
                    </div>
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
                    { this.props.article.seen === false ?
                    <span className="glyphicon glyphicon-exclamation-sign"> </span> : ''
                    }
                </li>
                
        )
    }
}
