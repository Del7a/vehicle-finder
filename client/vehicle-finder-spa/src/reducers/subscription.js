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
    NOTIFICATIONS_GET_FETCHING,
    NOTIFICATIONS_GET_SUCCESS,
    NOTIFICATIONS_GET_ERROR,
    NOTIFICATION_PUT_FETCHING,
    NOTIFICATION_PUT_SUCCESS,
    NOTIFICATION_PUT_ERROR,

    UPDATE_SUBSCRIPTION_FORM,

    GET_NOTIFICATION_ARTICLE_FETCHING,
    GET_NOTIFICATION_ARTICLE_SUCCESS,
    GET_NOTIFICATION_ARTICLE_ERROR,
    GET_NOTIFICATION_ARTICLE_RESET
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
    currentSubscription: defaultSubscription,
    notifications: [],
    notifArticles: []
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

        case NOTIFICATIONS_GET_FETCHING:
            return {...state, isFetching: true, currentInfoMessage: '', currentErrorMessage: ''}
        case NOTIFICATIONS_GET_SUCCESS:
            return {...state, isFetching: false, notifications: action.payload}
        case NOTIFICATIONS_GET_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload}

        case NOTIFICATION_PUT_FETCHING:
            return {...state, isFetching: true, currentInfoMessage: '', currentErrorMessage: ''}
        case NOTIFICATION_PUT_SUCCESS:
            return {...state, isFetching: false, notification: markNotificationAsSeen(state.notifications, action.payload.notification._id)}
        case NOTIFICATION_PUT_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload}

        case GET_NOTIFICATION_ARTICLE_FETCHING:
            return {...state}
        case GET_NOTIFICATION_ARTICLE_SUCCESS:
            return {...state, notifArticles: addToArray(state.notifArticles, action.payload.article, action.payload.seen)}
        case GET_NOTIFICATION_ARTICLE_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload}
        case GET_NOTIFICATION_ARTICLE_RESET:
            return {...state, notifArticles: []}

        default: 
            return state
    }
}

function removeSubscriptionFromState(arr, subscriptionId) {
    return arr.filter(function (el) {
        return el._id !== subscriptionId
    })
}

function markNotificationAsSeen(notifications, targetId) {
    return notifications.map((notification => {
        if(notification._id === targetId) {
            notification.isSeen = true;
        }

        return notification;
    }));
}

function addToArray(arr, item, seen) {
    item.seen = seen
    var copy = arr.slice()
    if(seen) {
        copy.push(item)
    } else {
        copy.splice(0, 0, item);
    }
    return copy
}

export default subscription