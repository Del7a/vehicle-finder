import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSingleArticle, updateForm, setCurrentArticle } from '../../actions/article';
import { Link } from 'react-router-dom';
import SingleArticleComponent  from '../../components/article/single-item-view';
import { Redirect } from 'react-router'

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
    }

    render() {

        return (
            <div>
                <SingleArticleComponent
                    title={this.props.article.currentArticle.title}
                    body={this.props.article.currentArticle.body}
                    year={this.props.article.currentArticle.year}
                    imageUrl={this.props.article.currentArticle.imageUrl}
                    tags={this.props.article.currentArticle.tags}
                />
            </div>
        )
    }
}

function mapStateToProps({article}) {
    console.log(article)
    return {article};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getSingleArticle, updateForm, setCurrentArticle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);