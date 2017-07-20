export const REQUEST_REGISTRATION = 'REQUEST_REGISTRATION';
export const REGISTRATIONS_SUCCESS = 'REGISTRATIONS_SUCCESS';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';
export const USERNAME_ALREADY_USED = 'USERNAME_ALREADY_USED';
export const REGISTRATION_FETCHED = 'REGISTRATION_FETCHED';
export const FORM_CHANGED = 'FORM_CHANGED';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';

function requsetRegistration(username, password) {
    console.log(`request registration ${username} ${password}`)
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

function registrationError(payload) {
    return {
        type: REGISTRATION_ERROR,
        payload: payload
    }
}

function usernameTaken(payload) {
    return {
        type: USERNAME_ALREADY_USED,
        payload: payload
    }
}

function registratonFetched(payload) {
    return {
        type: REGISTRATION_FETCHED
    }
}


//Actions creators
function fetchRegistrationRequest(username, password) {
    return dispatch => {
        dispatch(requsetRegistration(username, password));
        return fetch(`http://localhost:3000/api/register`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({username: username, password: password})
        })
        .then(response => {
            dispatch(registratonFetched()) 
            return response.json()
        })
        .then(json => {
            if(json.msg && json.msg.indexOf('already exists') > 0) {
                console.log('Username exists');
                dispatch(usernameTaken(true));
            }
        })
    }
}

export {fetchRegistrationRequest, formChanged}