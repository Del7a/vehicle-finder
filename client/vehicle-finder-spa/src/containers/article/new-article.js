import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createArticle, updateForm, getSingleArticle, updateArticle } from '../../actions/article';
import {requestMakers} from '../../actions/maker';
import {setCurrentArticle} from '../../actions/article';
import EditArticleForm from '../../components/article/edit-article';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router';


class NewArticle extends Component {

    constructor(props) {
        super(props)

        this.onInputFormChange = this.onInputFormChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        debugger
        if (this.props.match.params.id) {
            this.props.getSingleArticle(this.props.match.params.id)
        } else {
            this.props.setCurrentArticle()
        }

        if (this.props.maker.makers.length === 0) {
            this.props.requestMakers()
        }
    }

    onInputFormChange(ev) {
        this.props.updateForm(ev)
    }
    
    handleSubmit(ev) {
        ev.preventDefault()
        if (this.props.match.params.id) {
            this.props.updateArticle(this.props.article.currentArticle)
        } else {
            this.props.createArticle(this.props.article.currentArticle)
        }
    }

    render() {
           
            const infoMessage = this.props.article.currentInfoMessage !== '' ?
            <div className="alert alert-success info-message">
                <strong>Success!</strong> {this.props.article.currentInfoMessage}
            </div>
            : ''
            const errorMessage = this.props.article.currentErrorMessage !== '' ?
            <div className="alert alert-danger info-message">
                {this.props.article.currentErrorMessage}
            </div>
            : ''
            debugger
        return (
            <div>
                {infoMessage}
                {errorMessage}
                {<EditArticleForm
                    title={this.props.article.currentArticle.title}
                    body={this.props.article.currentArticle.body}
                    year={this.props.article.currentArticle.year}
                    price={this.props.article.currentArticle.price}
                    tags={this.props.article.currentArticle.tags}
                    imageUrl={this.props.article.currentArticle.imageUrl}
                    maker={this.props.article.currentArticle.maker}
                    model={this.props.article.currentArticle.model}
                    makersList={this.props.maker.makers}
                    formInputChanged={this.onInputFormChange}
                    handleSubmit={this.handleSubmit}
                />}
                <img className="media-object img-rounded car-image" src={this.props.article.currentArticle.imageUrl} />
        
                </div> 
        )
    }
}

function mapStateToProps({article, maker}) {
    console.log(article)
    return {article, maker};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({createArticle, updateForm,
                                requestMakers, setCurrentArticle,
                                getSingleArticle, updateArticle}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);