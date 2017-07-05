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

let initialUserProfile = {
    username: '',
    email: '',
    firstName: '',
    lastName: ''
}

function profile (state = initialUserProfile, action) {

    switch(action.type) {
        case RECIEVE_USER_PROFILE:
            return Object.assign({}, state, action.profile)
        case UPDATE_USER_PROFILE:
            console.log(action.profile);
            return Object.assign({}, state, action.profile)
        default:
            return state;
    }
}

export default profile