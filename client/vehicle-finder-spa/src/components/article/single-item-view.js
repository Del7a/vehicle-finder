import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import defaultPictureSrc from './../../assets/images/default.jpg';

export default class SingleArticleComponent extends Component {  

    render() {
        let imageSrc = defaultPictureSrc
        if (this.props.imageUrl) {
            imageSrc = this.props.imageUrl
        }
        
        return (
            <div>
                <div>
                    <img src={imageSrc} alt="offer" />
                </div>
                {this.props.title} - {this.props.year}
                <p>{this.props.body}</p>
                <img alt={this.props.title}
                    src={this.props.url} />
            </div>
        )
    }
}