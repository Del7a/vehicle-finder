import {
    REQUEST_REGISTRATION,
    REGISTRATIONS_SUCCESS,
    REGISTRATION_ERROR,
    FORM_CHANGED
} from '../actions/user/index'

const defaultState = {
    isFetching: false,
    isLoggedIn: false,
    hasReqestedRegistration: false,
    username: '',
    password: '',
    userId: ''
  };


const user = function(state = defaultState, action) {
    switch (action.type) {
        case REQUEST_REGISTRATION:
            return Object.assign({}, state, {isFetching:true, hasReqestedRegistration: true})
        case FORM_CHANGED:
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}

export default user;