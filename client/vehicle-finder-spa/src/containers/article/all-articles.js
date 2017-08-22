import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestAllArticles, updateForm, deleteArticle, searchArticles } from '../../actions/article';
import { Link } from 'react-router-dom';
import ArticleListComponent  from '../../components/article/list-item-view';
import { Redirect } from 'react-router'


class AllArticles extends Component {

    constructor(props) {
        super(props)

        this.handleArticleDelete = this.handleArticleDelete.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleEditRequest = this.handleEditRequest.bind(this)
    }

    componentDidMount() {
        if (this.props.article.allArticles.length === 0) {
            this.props.requestAllArticles()
        }
    }

    handleArticleDelete(ev, article) {
        this.props.deleteArticle(article)
    }

    handleSearch(ev) {
        const {value} = ev.target;
        if (value) {
            this.props.searchArticles(value)
        } else{
            this.props.requestAllArticles()
        }
    }

    handleEditRequest(articleId) {
        this.props.history.push(`/edit-article/${articleId}`)
    }

    render() {
        return (
            <div>
                <Link to='/create-article'>
                    Create article
                </Link>
                <input type="searchArticles" placeholder="search"
                    onChange={this.handleSearch} />
                {this.props.article.allArticles.length === 0
                ? <div>None</div>
                :
                <ArticleListComponent 
                    articles={this.props.article.allArticles}
                    handleArticleDelete={this.handleArticleDelete}
                    handleEditRequest={this.handleEditRequest}
                    currentUserId={this.props.user.currentUserId}
                />}
            </div>
        )
    }
}

function mapStateToProps({article, user}) {
    console.log(article)
    return {article, user};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ requestAllArticles, updateForm,
                                deleteArticle, searchArticles }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllArticles);