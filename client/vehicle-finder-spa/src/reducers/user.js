import {
    REQUEST_REGISTRATION,
    REGISTRATIONS_SUCCESS,
    REGISTRATION_ERROR,
    FORM_CHANGED,
    USERNAME_ALREADY_USED,
    REGISTRATION_FETCHED
} from '../actions/user/index'

const defaultState = {
    isFetching: false,
    isLoggedIn: false,
    hasReqestedRegistration: false,
    username: '',
    password: '',
    userId: '',
    usernameTaken: false,
    hasError: false
  };


const user = function(state = defaultState, action) {
    switch (action.type) {
        case REQUEST_REGISTRATION:
            return Object.assign({}, state, {isFetching: true, hasReqestedRegistration: true})
        case FORM_CHANGED:
            return Object.assign({}, state, action.payload)
        case USERNAME_ALREADY_USED:
            return {...state, usernameTaken: action.payload}
        case REGISTRATION_ERROR: 
            return {...state, hasError: action.payload}
        case REGISTRATION_FETCHED:
            return {...state, isFetching: false}
        default:
            return state
    }
}

export default user;