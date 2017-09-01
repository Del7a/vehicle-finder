export const ALL_ARTICLES_GET_FETCHING = 'ALL_ARTICLES_GET_FETCHING';
export const ALL_ARTICLES_GET_SUCCESS = 'ALL_ARTICLES_GET_SUCCESS';
export const ALL_ARTICLES_GET_ERROR = 'ALL_ARTICLES_GET_ERROR';

export const SINGLE_ARTICLE_GET_FETCHING = 'SINGLE_ARTICLE_GET_FETCHING';
export const SINGLE_ARTICLE_GET_SUCCESS = 'SINGLE_ARTICLE_GET_SUCCESS';
export const SINGLE_ARTICLE_GET_ERROR = 'SINGLE_ARTICLE_GET_ERROR';

export const ARTICLE_POST_FETCHING = 'ARTICLE_POST_FETCHING';
export const ARTICLE_POST_SUCCESS = 'ARTICLE_POST_SUCCESS';
export const ARTICLE_POST_ERROR = 'ARTICLE_POST_ERROR';

export const ARTICLE_PUT_FETCHING = 'ARTICLE_PUT_FETCHING';
export const ARTICLE_PUT_SUCCESS = 'ARTICLE_PUT_SUCCESS';
export const ARTICLE_PUT_ERROR = 'ARTICLE_PUT_ERROR';

export const ARTICLE_DELETE_FETCHING = 'ARTICLE_DELETE_FETCHING';
export const ARTICLE_DELETE_SUCCESS = 'ARTICLE_DELETE_SUCCESS';
export const ARTICLE_DELETE_ERROR = 'ARTICLE_DELETE_ERROR';

export const ARTICLE_SEARCH_FETCHING = 'ARTICLE_SEARCH_FETCHING';
export const ARTICLE_SEARCH_SUCCESS = 'ARTICLE_SEARCH_SUCCESS';
export const ARTICLE_SEARCH_ERROR = 'ARTICLE_SEARCH_ERROR';

export const UPDATE_ARTICLE_FORM = 'UPDATE_ARTICLE_FORM';

export const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';


function updateForm(newState) {
    return {
        type: UPDATE_ARTICLE_FORM,
        payload: {newState: newState}
    }
}

function setCurrentArticle(article) {
    return {
        type: SET_CURRENT_ARTICLE,
        payload: {currentArticle: article}
    }
}

/**
 * All articles get
 */

function allArticlesGetFetching() {
    return {
        type: ALL_ARTICLES_GET_FETCHING
    }
}

function allArticlesGetSuccess(articles) {
    return {
        type: ALL_ARTICLES_GET_SUCCESS,
        payload: {articles: articles}
    }
}

function allArticlesGetError(msg) {
    return {
        type: ALL_ARTICLES_GET_ERROR,
        payload: {message: msg}
    }
}

function requestAllArticles() {
     return dispatch => {
        dispatch(allArticlesGetFetching())
        return fetch(`http://localhost:3000/api/articles`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                console.log(json);
                if (json.success) {
                    dispatch(allArticlesGetSuccess(json.articles))
                } else {
                    dispatch(allArticlesGetError(json.msg))
                }                
            })
    }
}


/**
 * Article update
 */

function articleUpdateFetching() {
    return {
        type: ARTICLE_PUT_FETCHING
    }
}

function articleUpdateSuccess(msg) {
    debugger
    return {
        type: ARTICLE_PUT_SUCCESS,
        payload: {message: msg}
    }
}

function articleUpdateError(msg) {
    return {
        type: ARTICLE_PUT_ERROR,
        payload: {message: msg}
    }
}

function updateArticle(article) {
     return dispatch => {
        dispatch(articleUpdateFetching())
        debugger
        return fetch(`http://localhost:3000/api/articles/${article._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(article)
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                console.log(json);
                if(json.success) {
                    dispatch(articleUpdateSuccess(json.msg))
                } else {
                    dispatch(articleUpdateError(json.msg))
                }                
            })
    }
}

/**
 * Article create
 */

function articlePostFetching() {
    return {
        type: ARTICLE_POST_FETCHING
    }
}

function articlePostSuccess(article,msg) {
    return {
        type: ARTICLE_POST_SUCCESS,
        payload: {article: article, message: msg}
    }
}

function articlePostError(msg) {
    return {
        type: ARTICLE_POST_ERROR,
        payload: {message: msg}
    }
}

function createArticle(article) {
    return dispatch => {
        dispatch(articlePostFetching())
        return fetch(`http://localhost:3000/api/articles`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(article)
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                console.log(json);
                if(json.success) {
                    const newArticle = {...article, _id: json.id};
                    dispatch(articlePostSuccess(newArticle, json.msg))
                } else {
                    dispatch(articlePostError(json.msg))
                }                
            })
    }
}


/**
 * Article delete
 */

function articleDeleteFetching() {
    return {
        type: ARTICLE_DELETE_FETCHING
    }
}

function articleDeleteSuccess(article) {
    return {
        type: ARTICLE_DELETE_SUCCESS,
        payload: {article: article}
    }
}

function articleDeleteError(msg) {
    return {
        type: ARTICLE_DELETE_ERROR,
        payload: {message: msg}
    }
}

function deleteArticle(article) {
     return dispatch => {
        dispatch(articleDeleteFetching())
        return fetch(`http://localhost:3000/api/articles/${article._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                console.log(json);
                if(json.success) {
                    dispatch(articleDeleteSuccess(article))
                } else {
                    dispatch(articleDeleteError(json.msg))
                }                
            })
    }
}

/**
 * Single article get
 */

function singleArticleGetFetching() {
    return {
        type: SINGLE_ARTICLE_GET_FETCHING
    }
}

function singleArticleGetSuccess(article) {
    return {
        type: SINGLE_ARTICLE_GET_SUCCESS,
        payload: {article: article}
    }
}

function singleArticleGetError(msg) {
    return {
        type: SINGLE_ARTICLE_GET_ERROR,
        payload: {message: msg}
    }
}

function getSingleArticle(articleId) {
     return dispatch => {
        dispatch(singleArticleGetFetching())
        return fetch(`http://localhost:3000/api/articles/${articleId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                console.log(json);
                if(json.success) {
                    dispatch(singleArticleGetSuccess(json.article))
                } else {
                    dispatch(singleArticleGetError(json.msg))
                }                
            })
    }
}

/**
 * Article search result
 */

function articlesSearchFetching() {
    return {
        type: ARTICLE_SEARCH_FETCHING
    }
}

function articlesSearchSuccess(articles) {
    return {
        type: ARTICLE_SEARCH_SUCCESS,
        payload: {articles: articles}
    }
}

function articlesSearchError(msg) {
    return {
        type: ARTICLE_SEARCH_ERROR,
        payload: {message: msg}
    }
}

function searchArticles(input) {
    debugger
     return dispatch => {
        dispatch(articlesSearchFetching())
        return fetch(`http://localhost:3000/api/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({query: input})
            })
            .then(response => {
                return response.json()
            })
            .then(json => {
                console.log(json);
                if(json.success) {
                    debugger
                    dispatch(articlesSearchSuccess(json.articles))
                } else {
                    debugger
                    dispatch(articlesSearchError(json.msg))
                }                
            })
    }
}


export {requestAllArticles, updateArticle, deleteArticle,
        getSingleArticle, createArticle, updateForm, setCurrentArticle,
        searchArticles}