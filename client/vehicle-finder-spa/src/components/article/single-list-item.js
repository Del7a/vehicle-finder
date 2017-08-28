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
                <div key={this.props.article._id} onClick={() => this.onClick(this.props.article)}
                    className="row card">
                    <Link to={{pathname: `/article/${this.props.article._id}`}}>
                    <div className="col-md-7">
                        <img className="media-object img-rounded img-responsive" src={imageSrc} alt="Offer" />
                    </div>
                    <div className="col-md-5">
                        <h3>
                            {this.props.article.title} 
                        </h3>
                        <p>
                            {this.props.article.body}
                        </p>
                        <p> Year: {this.props.article.year} </p>
                    
                    
                        {this.props.article.user.id === this.props.currentUserId?
                        <button className="btn btn-primary"
                            onClick={this.handleEditRequest.bind(this, this.props.article._id)}>
                            Edit
                        </button> : ''}

                        {this.props.article.user.id === this.props.currentUserId?
                        <button className="btn btn-danger"
                            onClick={this.handleDelete.bind(this, this.props.article)}>
                            X
                        </button> : ''}
                    
                        { this.props.article.seen === false ?
                        <span className="glyphicon glyphicon-exclamation-sign"> </span> : ''
                        }
                    </div>
                    </Link>
                </div>
                
        )
    }
}
