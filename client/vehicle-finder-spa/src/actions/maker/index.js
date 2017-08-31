export const MAKERS_GET_FETCHING = 'MAKERS_GET_FETCHING';
export const MAKERS_GET_SUCCESS = 'MAKERS_GET_SUCCESS';
export const MAKERS_GET_ERROR = 'MAKERS_GET_ERROR';

export const MAKER_CREATE_FETCHING = 'MAKER_CREATE_FETCHING';
export const MAKER_CREATE_SUCCESS = 'MAKER_CREATE_SUCCESS';
export const MAKER_CREATE_ERROR = 'MAKER_CREATE_ERROR';

export const SINGLE_MAKER_GET_FETCHING = 'SINGLE_MAKER_GET_FETCHING';
export const SINGLE_MAKER_GET_SUCCESS = 'SINGLE_MAKER_GET_SUCCESS';
export const SINGLE_MAKER_GET_ERROR = 'SINGLE_MAKER_GET_ERROR'; 

export const MAKER_UPDATE_FETCHING = 'MAKER_UPDATE_FETCHING';
export const MAKER_UPDATE_SUCCESS = 'MAKER_UPDATE_SUCCESS';
export const MAKER_UPDATE_ERROR = 'MAKER_UPDATE_ERROR';

export const MAKER_DELETE_FETCHING = 'MAKER_DELETE_FETCHING';
export const MAKER_DELETE_SUCCESS = 'MAKER_DELETE_SUCCESS';
export const MAKER_DELETE_ERROR = 'MAKER_DELETE_ERROR';

export const MAKERS_FORM_CHANGED = 'MAKERS_FORM_CHANGED';
export const MODEL_FORM_CHANGED = 'MODEL_FORM_CHANGED';

export const MODEL_GET_FETCHING = 'MODEL_GET_FETCHING';
export const MODEL_GET_SUCCESS = 'MODEL_GET_SUCCESS';
export const MODEL_GET_ERROR = 'MODEL_GET_ERROR';

export const MODEL_CREATE_FETCHING = 'MODEL_CREATE_FETCHING';
export const MODEL_CREATE_SUCCESS = 'MODEL_CREATE_SUCCESS';
export const MODEL_CREATE_ERROR = 'MODEL_CREATE_ERROR';

export const MODEL_DELETE_FETCHING = 'MODEL_DELETE_FETCHING';
export const MODEL_DELETE_SUCCESS = 'MODEL_DELETE_SUCCESS';
export const MODEL_DELETE_ERROR = 'MODEL_DELETE_ERROR';

function formChanged(payload) {
    return {
        type: MAKERS_FORM_CHANGED,
        payload: payload
    }
}

function modelFormChanged(payload) {
    return {
        type: MODEL_FORM_CHANGED,
        payload: payload
    }
}


/**
 * All makers 
 */
function makersFetching() {
    return {
        type: MAKERS_GET_FETCHING
    }
}

function makersFetchedSuccess(makers) {
    return {
        type: MAKERS_GET_SUCCESS,
        payload: makers
    }
}

function makersFetchedError(msg) {
    return {
        type: MAKERS_GET_ERROR,
        payload: {currentErrorMessage: msg}
    }
}


function requestMakers() {
    return dispatch => {
        dispatch(makersFetching())
        return fetch(`http://localhost:3000/api/makers`, {
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
                    dispatch(makersFetchedSuccess(json.makers))
                } else {
                    dispatch(makersFetchedError(json.msg))
                }                
            })
    }
}


/**
 * Maker by id
 * 
 */

 function singleMakerFetching() {
    return {
        type: MAKERS_GET_FETCHING
    }
}

function singleMakerFetchedSuccess(maker) {
    return {
        type: SINGLE_MAKER_GET_SUCCESS,
        payload: maker
    }
}

function singleMakerFetchedError(msg) {
    return {
        type: MAKERS_GET_ERROR,
        payload: {currentErrorMessage: msg}
    }
}


function requestSingleMaker(id) {
    return dispatch => {
        console.log(id)
        dispatch(singleMakerFetching())
        return fetch(`http://localhost:3000/api/makers/${id}`,
            {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                if(json.success) {
                    dispatch(singleMakerFetchedSuccess(json.maker))
                } else {
                    dispatch(singleMakerFetchedError(json.msg))
                }
            })
    }
}


/**
 * Create Maker
 * 
 */

 function createMakerFetching() {
    return {
        type: MAKER_CREATE_FETCHING
    }
}

function createMakerFetchedSuccess(makerId, msg, maker) {
    return {
        type: MAKER_CREATE_SUCCESS,
        payload: {maker: maker, makerId: makerId, currentInfoMessage: msg}
    }
}

function createMakerFetchedError(msg) {
    return {
        type: MAKER_CREATE_ERROR,
        payload: {currentErrorMessage: msg}
    }
}


function createSingleMaker(maker) {
    debugger
    return dispatch => {
        dispatch(createMakerFetching())
        return fetch(`http://localhost:3000/api/makers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({name: maker})
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                if(json.success) {
                    dispatch(createMakerFetchedSuccess(json.newMakerId, json.msg, maker))
                } else {
                     dispatch(createMakerFetchedError(json.msg))
                }
            })
    }
}


/**
 * Update maker by id
 */

 function singleMakerUpdateFetching() {
    return {
        type: MAKERS_GET_FETCHING
    }
}

function singleMakerFetchedUpdateSuccess(msg) {
    return {
        type: MAKERS_GET_SUCCESS,
        payload: {currentInfoMessage: msg}
    }
}

function singleMakerFetchedUpdateError(msg) {
    return {
        type: MAKERS_GET_ERROR,
        payload: {currentErrorMessage: msg}
    }
}


function requestSingleUpdateMaker(maker) {
    return dispatch => {
        const body =JSON.stringify(maker)
        dispatch(singleMakerUpdateFetching())
        return fetch(`http://localhost:3000/api/makers/${maker._id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                maker: body
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                console.log(json);
                if(json.success) {
                    dispatch(singleMakerFetchedUpdateSuccess(json.maker))
                } else {
                    dispatch(singleMakerFetchedUpdateError(json.msg))
                }
            })
    }
}


/**
 * Delete maker by id
 */

 function makerDeleteFetching() {
    return {
        type: MAKER_DELETE_FETCHING
    }
}

function makerDeleteSuccess(msg, makerId) {
    return {
        type: MAKER_DELETE_SUCCESS,
        payload: {makerId: makerId, currentInfoMessage: msg}
    }
}

function makerDeleteError(msg) {
    return {
        type: MAKER_DELETE_ERROR,
        payload: {currentErrorMessage: msg}
    }
}


function deleteSingleMaker(makerId) {
    debugger
    return dispatch => {
        dispatch(makerDeleteFetching())
        return fetch(`http://localhost:3000/api/makers/${makerId}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },                
                credentials: 'include'
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                debugger
                if(json.success) {
                    dispatch(makerDeleteSuccess(json.msg, makerId))
                } else {
                    dispatch(makerDeleteError(json.msg))
                }
            })
    }
}

function createrModelFetching() {
    return {
        type: MODEL_CREATE_FETCHING
    }
}

function createrModelSuccess(msg) {
    return {
        type: MODEL_CREATE_SUCCESS,
        payload: {currentInfoMessage: msg}
    }
}

function createrModelError(msg) {
    return {
        type: MODEL_CREATE_ERROR,
        payload: {currentErrorMessage: msg}
    }
}

function createSingleModel(makerId, modelName) {
    return dispatch => {
        dispatch(createrModelFetching())   
        return fetch(`http://localhost:3000/api/makers/${makerId}/models`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({name: modelName})
        })
        .then(response => {
                console.log(response);
                return response.json()
        })
        .then(json => {
            if(json.success) {
                dispatch(createrModelSuccess(json.msg, modelName, json.modelId))
            } else {
                dispatch(createrModelError(json.msg))
            }
        })
    }
}


/**
 * Update maker
 */

 function updateMakerFetching() {
    return {
        type: MAKER_UPDATE_FETCHING
    }
}

function updateMakerSuccess(msg, maker) {
    return {
        type: MAKER_UPDATE_SUCCESS,
        payload: {currentInfoMessage: msg, maker: maker}
    }
}

function updateMakerError(msg) {
    return {
        type: MAKER_UPDATE_ERROR,
        payload: {currentErrorMessage: msg}
    }
}

function updateMaker(maker) {
    return dispatch => {
        dispatch(updateMakerFetching())
        return fetch(`http://localhost:3000/api/makers/${maker._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(maker)
        })
        .then(response => {
                console.log(response);
                return response.json()
        })
        .then(json => {
            if(json.success) {
                dispatch(updateMakerSuccess(json.msg, maker))
            } else {
                dispatch(updateMakerError(json.msg))
            }
        })
    }
}

/**
 * Delete Maker
 */

function deleteModelFetching() {
    return {
        type: MODEL_DELETE_FETCHING
    }
}

function deleteModelSuccess(msg, makerId, modelId) {
    return {
        type: MODEL_DELETE_SUCCESS,
        payload: {message: msg, makerId: makerId, modelId: modelId}
    }
}

function deleteModelError(msg) {
    return {
        type: MODEL_DELETE_ERROR,
        payload: msg
    }
}

function deleteSingleModel(makerId, modelId) {
    return dispatch => {
        dispatch(deleteModelFetching())
        return fetch(`http://localhost:3000/api/makers/${makerId}/models/${modelId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then(response => {
                console.log(response);
                return response.json()
        })
        .then(json => {
            if(json.success) {
                dispatch(deleteModelSuccess(json.msg, makerId, modelId))
            } else {
                dispatch(deleteModelError(json.msg))
            }
        })
    }
}

export { requestMakers, requestSingleUpdateMaker,
        requestSingleMaker, deleteSingleMaker,
        formChanged, createSingleMaker,
        createSingleModel, modelFormChanged,
        deleteSingleModel, updateMaker}