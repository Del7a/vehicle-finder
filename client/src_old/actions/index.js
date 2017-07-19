import {
    serverUrl,
    CHANGE_FORM,
    SET_AUTH,
    SENDING_REQUEST,
    LOGIN_REQUEST,
    REGISTER_REQUEST,
    LOGOUT,
    REQUEST_ERROR,
    CLEAR_ERROR,
    REQUEST_USER_PROFILE,
    RECIEVE_USER_PROFILE,
    UPDATE_USER_PROFILE
} from './constants'

import fetch from 'isomorphic-fetch'

export function changeForm (newFormState) {
    return {type: CHANGE_FORM, newFormState}
}

export function setAuthState (newAuthState) {
    return {type: SET_AUTH, newAuthState}
}

export function sendingRequest (sending) {
    return {type: SENDING_REQUEST, sending}
}

export function loginRequest (data) {
    return {type: LOGIN_REQUEST, data}
}

export function logout () {
    return {type: LOGOUT}
}

export function registerRequest (data) {
    return {type: REGISTER_REQUEST, data}
}

export function requestError (error) {
    return {type: REQUEST_ERROR, error}
}

export function clearError () {
    return {type: CLEAR_ERROR}
}

//User Profile actions
export function requesUserProfile(userData) {
    return {type: REQUEST_USER_PROFILE, userData}
}

export function recieveUserProfile(userData) {
    const profile = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
        };
        console.log(profile);
    return {type: RECIEVE_USER_PROFILE, profile}
}

export function updateUserProfile(profile) {    
    return {type: UPDATE_USER_PROFILE, profile}
}

export function fetchUserProfile(userData) {
    return dispatch => {
        dispatch(requesUserProfile, userData);
        var requestData =  {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        };
        return fetch(serverUrl + '/profile', requestData)
        .then(response => {
            return response.json();
        })
        .then(json => {
            dispatch(recieveUserProfile(json.user));
            return json;})
        .catch(err => console.log(err));
    }
}

export function postNewUserData(userData) {
     return dispatch => {

        console.log(userData)
        var req = {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email})
            };

        console.log(req);

        return fetch(serverUrl + '/profile', req)
        .then(function(response) {
                return response.json(response)
            }).then(function(json) {
                console.log('parsed json', json)
                if(json.success) {
                    return Promise.resolve(true);
                }else{
                   return Promise.reject(); 
                }
            }).catch(function(ex) {
                console.log('parsing failed', ex)
                return Promise.reject();
            }); 
        }
}
   