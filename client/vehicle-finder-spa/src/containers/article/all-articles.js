import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestAllArticles, updateForm, deleteArticle, searchArticles, setCurrentArticle } from '../../actions/article';
import { getUserProfile } from '../../actions/user'
import { requestMakers } from '../../actions/maker';
import { Link } from 'react-router-dom';
import ArticleListComponent  from '../../components/article/all-articles';



class AllArticles extends Component {

    constructor(props) {
        super(props)

        this.handleArticleDelete = this.handleArticleDelete.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleEditRequest = this.handleEditRequest.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    componentDidMount() {
        debugger
        this.props.requestAllArticles()
        if (this.props.maker.makers.length === 0) {
            this.props.requestMakers()
        }
        if(!this.props.user.userId) {
            this.props.getUserProfile()
        }
    }

    handleArticleDelete(article) {
        this.props.deleteArticle(article)
    }

    handleSearch(ev) {
        debugger
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

    onClick(article)
    {
       this.props.setCurrentArticle(article)
    }

    render() {
        debugger
        console.log(this.props)
        return (
            <div>
                <div className="search-wrapper">
                <input className="search-articles" type="searchArticles" placeholder="search"
                    onChange={this.handleSearch} />
                </div>
                {this.props.article.allArticles.length === 0
                ? <div>None</div>
                :
                <ArticleListComponent 
                    articles={this.props.article.allArticles}
                    handleArticleDelete={this.handleArticleDelete}
                    handleEditRequest={this.handleEditRequest}
                    currentUserId={this.props.user.userId}
                    isAdmin={this.props.user.isAdmin}
                    setCurrentArticle={this.setCurrentArticle}
                    onClick={this.onClick}
                    modelAndMakerStrings={this.props.maker.makersAndModelsString}
                />}
            </div>
        )
    }
}

function mapStateToProps({article, user, maker}) {
    return {article, user, maker};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ requestAllArticles, updateForm,
                                deleteArticle, searchArticles, setCurrentArticle,
                                requestMakers, getUserProfile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllArticles);