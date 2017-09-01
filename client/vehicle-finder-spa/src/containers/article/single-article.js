import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSingleArticle, updateForm, setCurrentArticle } from '../../actions/article';
import { newThreadRead, setCurrentMessageThread } from '../../actions/messages';
import { Link } from 'react-router-dom';
import { requestMakers } from '../../actions/maker';
import SingleArticleComponent  from '../../components/article/single-item-view';
import { Redirect } from 'react-router';

class SingleArticle extends Component {

    componentDidMount() {
        let currentArticle = {};

        if(this.props.match.params.id) {
            const seatchedId = this.props.match.params.id
            const matched = this.props.article.allArticles.filter((el) => {
                return el._id === seatchedId
            });

            if(matched.length > 0) {
                currentArticle = matched[0];
                this.props.setCurrentArticle(currentArticle)
            } else {
                this.props.getSingleArticle(this.props.match.params.id);
            }
        }
        debugger
        if (this.props.maker.makers.length === 0) {
            this.props.requestMakers()
        }

        this.props.setCurrentMessageThread()
    }

    componentDidUpdate() {
        const newThreadId = this.props.messages.newMessageThreadId
        if(newThreadId !== '') {
            this.props.newThreadRead()
            this.props.history.push(`/messages/${newThreadId}`)
        }
    }

    render() {
        const makerId = this.props.article.currentArticle.maker._id ? this.props.article.currentArticle.maker._id :
                                                                    this.props.article.currentArticle.maker
        const maker = this.props.maker.makersAndModelsString[makerId]

        debugger
        const model = this.props.maker.makersAndModelsString[this.props.article.currentArticle.model]
        return (
            <div>
                <SingleArticleComponent
                    title={this.props.article.currentArticle.title}
                    body={this.props.article.currentArticle.body}
                    year={this.props.article.currentArticle.year}
                    price={this.props.article.currentArticle.price}
                    imageUrl={this.props.article.currentArticle.imageUrl}
                    maker={maker}
                    model={model}
                    tags={this.props.article.currentArticle.tags}
                    articleId={this.props.article.currentArticle._id}
                    articleOwner={this.props.article.currentArticle.user}
                />
            </div>
        )
    }
}

function mapStateToProps({article, messages, maker}) {
    return {article, messages, maker};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getSingleArticle, updateForm, setCurrentArticle,
                                newThreadRead,setCurrentMessageThread, requestMakers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);