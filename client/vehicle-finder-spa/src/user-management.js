import {ALL_USERS_GET_FETCHING,
        ALL_USERS_GET_SUCCESS,
        ALL_USERS_GET_ERROR,
        SINGLE_USER_GET_FETCHING,
        SINGLE_USER_GET_SUCCESS,
        SINGLE_USER_GET_ERROR,
        SINGLE_USER_PUT_FETCHING,
        SINGLE_USER_PUT_SUCCESS,
        SINGLE_USER_PUT_ERROR,
        SINGLE_USER_DELETE_FETCHING,
        SINGLE_USER_DELETE_SUCCESS,
        SINGLE_USER_DELETE_ERROR}
from '../actions/user-management/index';

import {REGISTRATIONS_SUCCESS}
from '../actions/user/index';

const defaultState = {
    allUsers: [],
    isFetching: false,
    currentSelectedUser:{
        firstName: '',
        lastName: ''
    },
    currentInfoMessage: '',
    currentErrorMessage: '',
    usersNeedResync: false
};

const userManagement = function(state = defaultState, action) {
    switch(action.type) {
        case ALL_USERS_GET_FETCHING:
            return {...state, isFetching: true, usersNeedResync: false}
        case ALL_USERS_GET_SUCCESS:
            return {...state, usersNeedResync: false, isFetching: false,
                allUsers: action.payload.users, currentErrorMessage: ''}
        case ALL_USERS_GET_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message, currentInfoMessage: ''}
        
        case SINGLE_USER_GET_FETCHING:
            return {...state, isFetching: true, currentSelectedUser: action.payload.user, currentErrorMessage: ''}
        case SINGLE_USER_GET_SUCCESS:
            return {...state, isFetching: false, currentSelectedUser: action.payload.user, currentErrorMessage: ''}
        case SINGLE_USER_GET_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message, currentInfoMessage: ''}
        
        case SINGLE_USER_PUT_FETCHING:
            return {...state, isFetching: true, currentSelectedUser: action.payload.user, currentErrorMessage: ''}
        case SINGLE_USER_PUT_SUCCESS:
            return {...state, isFetching: false, currentInfoMessage: action.payload.message,
                currentErrorMessage: '',
                usersNeedResync: true,
                allUsers: updateUser(state.allUsers, action.payload.user._id),
                currentSelectedUser: [...action.payload.user]
            }
        case SINGLE_USER_PUT_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message, currentInfoMessage: ''}
        

        case SINGLE_USER_DELETE_FETCHING:
            return {...state, isFetching: true}
        case SINGLE_USER_DELETE_SUCCESS:
            return {...state, isFetching: false, currentSelectedUser: action.payload.user,
                currentErrorMessage: '',
                allUsers: removeUserById(state.allUsers, action.payload.userId)
        }
        case SINGLE_USER_DELETE_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message,
                currentInfoMessage: '',
            }
        case REGISTRATIONS_SUCCESS:
            return {...state, usersNeedResync: true}
        
        default:
            return state
    }
}

function removeUserById(users, userId) {
    return users.filter(function (el){
        return el._id !== userId
    });
}

function updateUser(users, useToUpdate) {
    return users.filter(function (el){
        if(el._id !== useToUpdate._id) {
            return el
        } else {
            return {...useToUpdate}
        }
    });
}

export default userManagement