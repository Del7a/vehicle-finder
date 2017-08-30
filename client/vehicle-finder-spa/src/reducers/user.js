import {
    REQUEST_REGISTRATION,
    REGISTRATIONS_SUCCESS,
    REGISTRATION_ERROR,
    FORM_CHANGED,
    USERNAME_ALREADY_USED,
    REGISTRATION_FETCHED,
    LOGIN_REQUESTED,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    PASS_CHANGE_REQUEST,
    PASS_CHANGE_SUCCESS,
    PASS_CHANGE_ERROR,
    PROFILE_FETCH_REQUEST,
    PROFILE_FETCHED,
    PROFILE_FETCH_ERROR,
    PROFILE_UPDATE_FETCHING,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_ERROR,
    SET_CURRENT_USER,
    LOGOUT_FETCHING,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR
} from '../actions/user/index'

const defaultState = {
    isFetching: false,
    isLoggedIn: false,
    loginFailed: false,
    hasReqestedRegistration: false,
    username: '',
    password: '',
    oldPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
    passwordChanged: false,
    passwordChangeError: false,
    currentErrorMessage: '',
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    usernameTaken: false,
    hasError: false,
  };


const user = function(state = defaultState, action) {
    switch (action.type) {
        case REQUEST_REGISTRATION:
            return {...state, isFetching: true, hasReqestedRegistration: true,
                usernameTaken: false, currentErrorMessage: ''}
        case FORM_CHANGED:
            return Object.assign({}, state, action.payload)
        case USERNAME_ALREADY_USED:
            return {...state, usernameTaken: action.payload}
        case REGISTRATIONS_SUCCESS:
            return {...state, currentErrorMessage: '', usernameTaken: false,
                username: '', password: ''
            }
        case REGISTRATION_ERROR: 
            return {...state, hasError: action.payload}
        case REGISTRATION_FETCHED:
            return {...state, isFetching: false}
        case LOGIN_FAILED:
            return {...state, loginFailed: true, password: ''};
        case LOGIN_SUCCESS:
            return {...state, isLoggedIn: true, password: ''}
        case PASS_CHANGE_REQUEST:
            return {...state, isFetching: true, passwordChanged: false, passwordChangeError: false}
        case PASS_CHANGE_SUCCESS:
            return{...state, isFetching: false, passwordChanged: true, passwordChangeError: false}
        case PASS_CHANGE_ERROR:
            return{...state, isFetching: false,
                passwordChanged: false,
                passwordChangeError: true,
                currentErrorMessage: action.payload.message
            }
        case PROFILE_FETCH_REQUEST:
            return {...state, isFetching: true}
        case PROFILE_FETCHED:
            return {...state, isFetching: false, userId: action.payload.user._id, 
                    firstName: action.payload.user.firstName,
                    lastName: action.payload.user.lastName,
                    email: action.payload.user.email,
                    username: action.payload.user.username }
        case PROFILE_FETCH_ERROR:
            return{...state, isFetching: false,
                currentErrorMessage: action.payload.message
            }

        case PROFILE_UPDATE_FETCHING:
            return {...state, isFetching: true}
        case PROFILE_UPDATE_SUCCESS:
            return Object.assign({}, state, {isFetching: false} ,action.payload)
        case PROFILE_UPDATE_ERROR:
            return{...state, isFetching: false,
                currentErrorMessage: action.payload.message
            }
        case SET_CURRENT_USER:
            return {...state, userId: action.payload.user.user_id,
                    firstName: action.payload.user.firstName,
                    lastName: action.payload.user.lastName,
                    email: action.payload.user.email,
                    username: action.payload.user.username    
                }
        
        case LOGOUT_FETCHING:
            return {...state, isFetching: true}
        case LOGOUT_SUCCESS:
            return {...state, isFetching: false, isLoggedIn: false}
        case LOGOUT_ERROR:
            return {...state, isFetching: false}
         
        default:
            return state
    }
}

export default user;