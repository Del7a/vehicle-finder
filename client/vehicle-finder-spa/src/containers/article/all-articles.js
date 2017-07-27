import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestAllArticles, updateForm } from '../../actions/article';
import { Link } from 'react-router-dom';
import ArticleListComponent  from '../../components/article/list-item-view';
import { Redirect } from 'react-router'


class AllArticles extends Component {

    componentDidMount() {
        if(this.props.article.allArticles.length === 0) {
            this.props.requestAllArticles()
        }
    }

    render() {
        return (
            this.props.article.allArticles.length === 0
            ? <div>None</div>
            :
            <ArticleListComponent 
                articles={this.props.article.allArticles}
            />
        )
    }
}

function mapStateToProps({article}) {
    console.log(article)
    return {article};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ requestAllArticles, updateForm }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllArticles);