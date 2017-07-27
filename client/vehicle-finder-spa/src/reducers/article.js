import {
    ALL_ARTICLES_GET_FETCHING,
    ALL_ARTICLES_GET_SUCCESS,
    ALL_ARTICLES_GET_ERROR,
    SINGLE_ARTICLE_GET_FETCHING,
    SINGLE_ARTICLE_GET_SUCCESS ,
    SINGLE_ARTICLE_GET_ERROR,
    ARTICLE_POST_FETCHING,
    ARTICLE_POST_SUCCESS,
    ARTICLE_POST_ERROR,
    ARTICLE_PUT_FETCHING,
    ARTICLE_PUT_SUCCESS,
    ARTICLE_PUT_ERROR,
    ARTICLE_DELETE_FETCHING,
    ARTICLE_DELETE_SUCCESS,
    ARTICLE_DELETE_ERROR,

    UPDATE_ARTICLE_FORM
} from '../actions/article';

const defaultState = {
    isFetching: false,
    currentInfoMessage: '',
    currentErrorMessage: '',
    articlesNeedResync: false,
    allArticles: [],
    currentArticle: {
        title: '', body: '', year: '', maker: '597642e10d5c59436bc0893b',
        model: '5977ab3e21cdee47db5f7c1c', resourceUrl: '', tags: '',
        user: {}, createdAt: ''    
    }
}

const article = function(state = defaultState, action) {
    switch(action.type) {
        case UPDATE_ARTICLE_FORM:
            return {...state, currentArticle: 
                        {...state.currentArticle, ...action.payload.newState}
                    }

        case ALL_ARTICLES_GET_FETCHING:
            return {...state, isFetching: true, currentInfoMessage: '',
                currentErrorMessage: ''
            }
        case ALL_ARTICLES_GET_SUCCESS:
            return {...state, isFetching: false, allArticles: action.payload.articles}
        case ALL_ARTICLES_GET_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message}
        case SINGLE_ARTICLE_GET_FETCHING:
            return {...state, isFetching: true, currentInfoMessage: '',
                currentErrorMessage: ''
            }
        case SINGLE_ARTICLE_GET_SUCCESS:
            return {...state, isFetching: false, allArticles: action.payload.article}
        case SINGLE_ARTICLE_GET_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message}
        
        case ARTICLE_POST_FETCHING:
            return {...state, isFetching: true, currentInfoMessage: '',
                currentErrorMessage: ''
            }
        case ARTICLE_POST_SUCCESS:
            return {...state, isFetching: false,
                allArticles: state.allArticles.splice().push(action.payload.article)}
        case ARTICLE_POST_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message}
        
        case ARTICLE_DELETE_FETCHING:
            return {...state, isFetching: true, currentInfoMessage: '',
                currentErrorMessage: ''
            }
        case ARTICLE_DELETE_SUCCESS:
            return {...state, isFetching: false,
                allArticles: removeArticleFromState(state.allArticles, action.payload.article)}
        case ARTICLE_DELETE_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message}
            
        case ARTICLE_PUT_FETCHING:
            return {...state, isFetching: true, currentInfoMessage: '',
                currentErrorMessage: ''
            }
        case ARTICLE_PUT_SUCCESS:
            return {...state, isFetching: false,
                allArticles: updateArticleFromState(state.allArticles, action.payload.article)}
        case ARTICLE_PUT_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message}
           
        
        default:
            return state
    }
}

function removeArticleFromState(arr, artile) {
    return arr.filter(function (el) {
        return el._id !== article._id
    })
}

function updateArticleFromState(arr, artile) {
    return arr.filter(function (el) {
        if(el._id !== article._id) {
            return el
        } else {
            return article
        }
    })
}

export default article