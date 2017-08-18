import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SingleArticleComponent extends Component {  

    render() {
        return (
            <div>
                {this.props.title} - {this.props.year}
                <p>{this.props.body}</p>
                <img alt={this.props.title}
                    src={this.props.url} />
            </div>
        )
    }
}