import React, { Component } from 'react';

export default class ArticleListComponent extends Component {  

    render() {
        const listItems = this.props.articles.map((article) =>
            <li key={article._id}>
                {article.title} - {article.year}
            </li>)

        return (
            <div>
                {listItems}
            </div>
        )
    }
}