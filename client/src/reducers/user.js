import {
    CHANGE_FORM,
    SET_AUTH,
    SENDING_REQUEST,
    REQUEST_ERROR,
    CLEAR_ERROR,
    REQUEST_USER_PROFILE,
    RECIEVE_USER_PROFILE,
    UPDATE_USER_PROFILE
} from '../actions/constants'
import auth from '../auth'

// The initial application state
let initialState = {
    formState: {
        username: '',
        password: ''
    },
    error: '',
    currentlySending: false,
    loggedIn: auth.loggedIn()
}

function user (state = initialState, action) {
    switch (action.type) {
        case CHANGE_FORM:
            return {...state, formState: action.newFormState}
        case SET_AUTH:
            return {...state, loggedIn: action.newAuthState}
        case SENDING_REQUEST:
            return {...state, currentlySending: action.sending}
        case REQUEST_ERROR:
            return {...state, error: action.error}
        case CLEAR_ERROR:
            return {...state, error: ''}
        // case RECIEVE_USER_PROFILE:
        //     console.log(action);
        //     return {...state, userProfile: action.userData}
        default:
            return state
    }
}

export default user;