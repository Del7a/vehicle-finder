import {
    ALL_SUBSCRIPTIONS_GET_FETCHING,
    ALL_SUBSCRIPTIONS_GET_SUCCESS,
    ALL_SUBSCRIPTIONS_GET_ERROR,    
    SUBSCRIPTION_POST_FETCHING,
    SUBSCRIPTION_POST_SUCCESS,
    SUBSCRIPTION_POST_ERROR,
    SUBSCRIPTION_GET_FETCHING,
    SUBSCRIPTION_GET_SUCCESS,
    SUBSCRIPTION_GET_ERROR,
    SUBSCRIPTION_DELETE_FETCHING,
    SUBSCRIPTION_DELETE_SUCCESS,
    SUBSCRIPTION_DELETE_ERROR,

    UPDATE_SUBSCRIPTION_FORM
} from '../actions/subscription';

const defaultSubscription = {
    title: '',
    yearFrom: '',
    yearTo: '',
    priceFrom: '',
    priceTo: '',
    maker: '',
    model: '',
    createdAt: ''
};

const defaultState = {
    isFetching: false,
    currentInfoMessage: '',
    currentErrorMessage: '',
    allSubscriptions: [],
    currentSubscription: defaultSubscription
}


const subscription = function(state = defaultState, action) {
    switch(action.type) {
        case UPDATE_SUBSCRIPTION_FORM:
            return {...state, currentSubscription: 
                        {...state.currentSubscription, ...action.payload.newState}
                    }

        case ALL_SUBSCRIPTIONS_GET_FETCHING:
            return {...state, isFetching: true, currentInfoMessage: '', currentErrorMessage: ''}
        case ALL_SUBSCRIPTIONS_GET_SUCCESS:
            return {...state, isFetching: false, allSubscriptions: action.payload}
        case ALL_SUBSCRIPTIONS_GET_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload}

        case SUBSCRIPTION_GET_FETCHING:
            return {...state, isFetching: true, currentSubscription: defaultSubscription,
                    currentInfoMessage: '', currentErrorMessage: ''}
        case SUBSCRIPTION_GET_SUCCESS:
            return {...state, isFetching: false, currentSubscription: action.payload}
        case SUBSCRIPTION_GET_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload}

        case SUBSCRIPTION_POST_FETCHING:
            return {...state, isFetching: true, currentInfoMessage: '', currentErrorMessage: ''}
        case SUBSCRIPTION_POST_SUCCESS:
            return {...state, isFetching: false, currentInfoMessage: action.payload}
        case SUBSCRIPTION_POST_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload}
        
        case SUBSCRIPTION_DELETE_FETCHING:
            return {...state, isFetching: true, currentInfoMessage: '', currentErrorMessage: ''}
        case SUBSCRIPTION_DELETE_SUCCESS:
            return {...state, isFetching: false, currentInfoMessage: action.payload.message,
                allSubscriptions: removeSubscriptionFromState(state.allSubscriptions, action.payload.subscriptionId)}
        case SUBSCRIPTION_DELETE_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload}

        

        default: 
            return state
    }
}

function removeSubscriptionFromState(arr, subscriptionId) {
    return arr.filter(function (el) {
        return el._id !== subscriptionId
    })
}

export default subscription