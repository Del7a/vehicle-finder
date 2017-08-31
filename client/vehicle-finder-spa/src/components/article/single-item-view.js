import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import SingleMessageThread from '../../containers/messages/single-thread';
import defaultPictureSrc from './../../assets/images/default.jpg';

export default class SingleArticleComponent extends Component {  

    render() {
        let imageSrc = defaultPictureSrc
        if (this.props.imageUrl) {
            imageSrc = this.props.imageUrl
        }
        
        return (
            <div className="single-article-card">
              <header>
                <img src={imageSrc} alt="offer" />
                <div className="text-wrap">
                  <h2>{this.props.title}</h2>
                </div>
              </header>
              <main>
                <a href="#" className="cta-wrap">
                <SingleMessageThread
                    articleId={this.props.articleId}
                    articleOwner={this.props.articleOwner}
                />
                </a>
                <div className="info-wrap">
                  <h4>Description: {this.props.body}</h4>
                  <h4>Maker: {this.props.maker} &nbsp; Model: {this.props.model}</h4>
                  <h4>Year: {this.props.year} &nbsp; Price: {this.props.price}</h4>
                  <p> Tags: {this.props.tags}</p>
                  <p> Created at: {this.props.createdAt}</p>
                 </div>
              </main>
            </div>
        )
    }
}