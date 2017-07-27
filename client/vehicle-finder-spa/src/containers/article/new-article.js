import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createArticle, updateForm } from '../../actions/article';
import EditArticleForm from '../../components/article/edit-article';
import { Link } from 'react-router-dom';


class NewArticle extends Component {

    constructor(props) {
        super(props)

        this.onInputFormChange = this.onInputFormChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onInputFormChange(ev) {
        console.log(ev)
        this.props.updateForm(ev)
    }
    
    handleSubmit(ev) {
        ev.preventDefault()
        this.props.createArticle(this.props.article.currentArticle)
    }

    render() {
        return (
            <div>{<EditArticleForm
                    title={this.props.article.currentArticle.title}
                    body={this.props.article.currentArticle.body}
                    year={this.props.article.currentArticle.year}
                    tags={this.props.article.currentArticle.tag}
                    url={this.props.article.currentArticle.url}
                    maker={this.props.article.currentArticle.maker}
                    model={this.props.article.currentArticle.model}
                    formInputChanged={this.onInputFormChange}
                    handleSubmit={this.handleSubmit}
                />}</div>
        )
    }
}

function mapStateToProps({article}) {
    console.log(article)
    return {article};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({createArticle, updateForm}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);