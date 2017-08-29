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

    ARTICLE_SEARCH_FETCHING,
    ARTICLE_SEARCH_SUCCESS,
    ARTICLE_SEARCH_ERROR,

    SET_CURRENT_ARTICLE,
    UPDATE_ARTICLE_FORM
} from '../actions/article';

const defaultCurrentArticle = {
        title: '', body: '', year: '', price: '',
        maker: '', model: '', resourceUrl: '', tags: '',
        user: {}, createdAt: ''    
    }

const defaultState = {
    isFetching: false,
    currentInfoMessage: '',
    currentErrorMessage: '',
    articlesNeedResync: false,
    allArticles: [],
    currentArticle: defaultCurrentArticle
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
            return {...state, isFetching: false, currentArticle: action.payload.article}
        case SINGLE_ARTICLE_GET_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message}
        
        case ARTICLE_POST_FETCHING:
            return {...state, isFetching: true, currentInfoMessage: '',
                currentErrorMessage: ''
            }
        case ARTICLE_POST_SUCCESS:
            const newArr = state.allArticles.filter((el) => {return el})
            newArr.push(action.payload.article)
            return {...state, isFetching: false, allArticles: newArr,
                    currentInfoMessage: action.payload.message}
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
           
        case SET_CURRENT_ARTICLE:
            return {...state , currentArticle: action.payload.currentArticle ?
                    action.payload.currentArticle: defaultCurrentArticle
            }


        case ARTICLE_SEARCH_FETCHING:
            return {...state, isFetching: true, currentInfoMessage: '',
                currentErrorMessage: ''
            }
        case ARTICLE_SEARCH_SUCCESS:
            return {...state, isFetching: false, allArticles: action.payload.articles}
        case ARTICLE_SEARCH_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message}
        
        default:
            return state
    }
}

function removeArticleFromState(arr, article) {
    return arr.filter(function (el) {
        return el._id !== article._id
    })
}

function updateArticleFromState(arr, article) {
    return arr.filter(function (el) {
        if(el._id !== article._id) {
            return el
        } else {
            return article
        }
    })
}

export default article