export const REQUEST_REGISTRATION = 'REQUEST_REGISTRATION';
export const REGISTRATIONS_SUCCESS = 'REGISTRATIONS_SUCCESS';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';
export const FORM_CHANGED = 'FORM_CHANGED';

function requsetRegustration(username, password) {
    return {
        type: REQUEST_REGISTRATION,
        payload: {username: username, password: password}
    }
}

function formChanged(payload) {
    return {
        type: FORM_CHANGED,
        payload: payload
    }
}


//Actions creators
function fetchRegistrationRequest(username, password) {
    return dispatch => {
        dispatch(requsetRegustration(username, password));
        return fetch(`http://localhost:3000/api/register`,{
            method: 'POST',
            credentials: 'include',
            data: JSON.stringify({username: username, password: password})
        })
        .then(response => {console.log(response); response.json()})
        //.then(json => dispatch(receivePosts(subreddit, json)))
    }
}

export {fetchRegistrationRequest, formChanged}