export const ALL_USERS_GET_FETCHING = 'ALL_USERS_GET_FETCHING';
export const ALL_USERS_GET_SUCCESS = 'ALL_USERS_GET_SUCCESS';
export const ALL_USERS_GET_ERROR = 'ALL_USERS_GET_ERROR';

export const SINGLE_USER_GET_FETCHING = 'SINGLE_USER_GET_FETCHING';
export const SINGLE_USER_GET_SUCCESS = 'SINGLE_USER_GET_SUCCESS';
export const SINGLE_USER_GET_ERROR = 'SINGLE_USER_GET_ERROR';

export const SINGLE_USER_PUT_FETCHING = 'SINGLE_USER_PUT_FETCHING';
export const SINGLE_USER_PUT_SUCCESS = 'SINGLE_USER_PUT_SUCCESS';
export const SINGLE_USER_PUT_ERROR = 'SINGLE_USER_PUT_ERROR';

export const SINGLE_USER_DELETE_FETCHING = 'SINGLE_USER_DELETE_FETCHING';
export const SINGLE_USER_DELETE_SUCCESS = 'SINGLE_USER_DELETE_SUCCESS';
export const SINGLE_USER_DELETE_ERROR = 'SINGLE_USER_DELETE_ERROR';


/**
 * All users
 */

function allUsersGetFetching() {
    return {
        type: ALL_USERS_GET_FETCHING
    }
}

function allUsersGetSuccess(users) {
    return {
        type: ALL_USERS_GET_SUCCESS,
        payload: {users: users}
    }
}

function allUsersGetError(msg) {
    return {
        type: ALL_USERS_GET_ERROR,
        payload: {message: msg}
    }
}

function requestAllUsers() {
     return dispatch => {
        dispatch(allUsersGetFetching())
        return fetch(`http://localhost:3000/api/users`, {
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
                    dispatch(allUsersGetSuccess(json.users))
                } else {
                    dispatch(allUsersGetError(json.msg))
                }                
            })
    }
}

/**
 * Single user get
 */

function singleUsersGetFetching() {
    return {
        type: SINGLE_USER_GET_FETCHING
    }
}

function singleUserGetSuccess(user) {
    return {
        type: SINGLE_USER_GET_SUCCESS,
        payload: {users: user}
    }
}

function singleUserGetError(msg) {
    return {
        type: SINGLE_USER_GET_FETCHING,
        payload: {message: msg}
    }
}

function requsetSingleUser(userId) {
     return dispatch => {
        dispatch(singleUsersGetFetching())
        return fetch(`http://localhost:3000/api/users/${userId}`, {
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
                    dispatch(singleUserGetSuccess(json.user))
                } else {
                    dispatch(singleUserGetError(json.msg))
                }                
            })
    }
}


/**
 * Single user put
 */

function singleUsersPutFetching(user) {
    return {
        type: SINGLE_USER_PUT_FETCHING,
        payload: {user: user}
    }
}

function singleUserPutSuccess(user, msg) {
    return {
        type: SINGLE_USER_PUT_SUCCESS,
        payload: {user: user, message: msg}
    }
}

function singleUserPutError(msg) {
    return {
        type: SINGLE_USER_PUT_FETCHING,
        payload: {message: msg}
    }
}

function updateSingleUser(user) {
     return dispatch => {
        dispatch(singleUsersPutFetching(user))
        return fetch(`http://localhost:3000/api/users/${user._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(user)
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                console.log(json);
                if (json.success) {
                    dispatch(singleUserPutSuccess(user, json.msg))
                } else {
                    dispatch(singleUserPutError(json.msg))
                }                
            })
    }
}

/**
 * Single user delete
 */
function singleUsersDeleteFetching() {
    return {
        type: SINGLE_USER_DELETE_FETCHING
    }
}

function singleUserDeleteSuccess(userId) {
    return {
        type: SINGLE_USER_DELETE_SUCCESS,
        payload: {userId: userId}
    }
}

function singleUserDeleteError(msg) {
    return {
        type: SINGLE_USER_DELETE_FETCHING,
        payload: {message: msg}
    }
}

function deleteSingleUser(userId) {
     return dispatch => {
         debugger
        dispatch(singleUsersDeleteFetching())
        return fetch(`http://localhost:3000/api/users/${userId}`, {
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
                if (json.success) {
                    dispatch(singleUserDeleteSuccess(userId))
                } else {
                    dispatch(singleUserDeleteError(json.msg))
                }                
            })
    }
}

export {requestAllUsers, requsetSingleUser, updateSingleUser, deleteSingleUser}