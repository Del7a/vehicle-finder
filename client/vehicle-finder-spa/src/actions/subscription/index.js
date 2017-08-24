export const ALL_SUBSCRIPTIONS_GET_FETCHING = 'ALL_SUBSCRIPTIONS_GET_FETCHING';
export const ALL_SUBSCRIPTIONS_GET_SUCCESS = 'ALL_SUBSCRIPTIONS_GET_SUCCESS';
export const ALL_SUBSCRIPTIONS_GET_ERROR = 'ALL_SUBSCRIPTIONS_GET_ERROR';

export const SUBSCRIPTION_POST_FETCHING = 'SUBSCRIPTION_POST_FETCHING';
export const SUBSCRIPTION_POST_SUCCESS = 'SUBSCRIPTION_POST_SUCCESS';
export const SUBSCRIPTION_POST_ERROR = 'SUBSCRIPTION_POST_ERROR';

export const SUBSCRIPTION_GET_FETCHING = 'SUBSCRIPTION_GET_FETCHING';
export const SUBSCRIPTION_GET_SUCCESS = 'SUBSCRIPTION_GET_SUCCESS';
export const SUBSCRIPTION_GET_ERROR = 'SUBSCRIPTION_GET_ERROR';

export const SUBSCRIPTION_DELETE_FETCHING = 'SUBSCRIPTION_DELETE_FETCHING';
export const SUBSCRIPTION_DELETE_SUCCESS = 'SUBSCRIPTION_DELETE_SUCCESS';
export const SUBSCRIPTION_DELETE_ERROR = 'SUBSCRIPTION_DELETE_ERROR';

export const UPDATE_SUBSCRIPTION_FORM = 'UPDATE_SUBSCRIPTION_FORM';

function updateForm(newState) {
    return {
        type: UPDATE_SUBSCRIPTION_FORM,
        payload: {newState: newState}
    }
}

/**
 * Get all subscriptions
 */

function allSubsriptionsFetching() {
    return {
        type: ALL_SUBSCRIPTIONS_GET_FETCHING
    }
}

function allSubscriptionsSuccess(subscriptions) {
    return {
        type: ALL_SUBSCRIPTIONS_GET_SUCCESS,
        payload: subscriptions
    }
}

function allSubscriptionsError(message) {
    return {
        type: ALL_SUBSCRIPTIONS_GET_ERROR,
        payload: message
    }
}

function requestAllSubscriptions() {
    return dispatch => {
        dispatch(allSubsriptionsFetching())
        return fetch(`http://localhost:3000/api/subscriptions`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'            
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            console.log(json)
            if(json.success) {
                dispatch(allSubscriptionsSuccess(json.subscriptions))
            } else {
                dispatch(allSubscriptionsError(json.msg))
            }
        })
    }
}

/**
 * Get single subscription
 */

function singleSubscriptionFetching() {
    return {
        type: SUBSCRIPTION_GET_FETCHING
    }
}

function singleSubscriptionSuccess(sub) {
    return {
        type: SUBSCRIPTION_GET_SUCCESS,
        payload: sub
    }
}

function singleSubscriptionError(message) {
    return {
        type: SUBSCRIPTION_GET_ERROR,
        payload: message
    }
}

function fetchSingleSubscription(subscriptionId) {
    return dispatch => {
        dispatch(singleSubscriptionFetching())
        fetch(`http://localhost:3000/api/subscription/${subscriptionId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then(response => {
            response.json()
        })
        .then(json => {
            if(json.success) {
                dispatch(singleSubscriptionSuccess(json.subscription))
            } else {
                dispatch(singleSubscriptionError(json.msg))
            }
        })
    }
}

/**
 * Create new subscription
*/

function createSubscriptionFetching() {
    return {
        type: SUBSCRIPTION_POST_FETCHING
    }
}

function createSubscriptionSuccess(message) {
    return {
        type: SUBSCRIPTION_POST_SUCCESS,
        payload: message
    }
}

function createSubscriptionError(message) {
    return {
        type: SUBSCRIPTION_POST_ERROR,
        payload: message
    }
}


function createSubscription(subscription) {
    return dispatch => {
        dispatch(createSubscriptionFetching())
        fetch(`http://localhost:3000/api/subscriptions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include' ,
            body: JSON.stringify(subscription)
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            if(json.success) {
                dispatch(createSubscriptionSuccess(json.msg))
            } else {
                dispatch(createSubscriptionError(json.msg))
            }
        })
    }
}


/**
 * Delete subscription 
 */

function deleteSubscriptionFetching() {
    return {
        type: SUBSCRIPTION_DELETE_FETCHING
    }
}

function deleteSubscriptionSuccess(message, subscriptionId) {
    return {
        type: SUBSCRIPTION_DELETE_SUCCESS,
        payload: { message: message, subscriptionId: subscriptionId }
    }
}

function deleteSubscriptionError(message) {
    return {
        type: SUBSCRIPTION_DELETE_ERROR,
        payload: message
    }
}

function deleteSubscription(subscriptionId) {
    return dispatch => {
        dispatch(deleteSubscriptionFetching())
        fetch(`http://localhost:3000/api/subscriptions/${subscriptionId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            if(json.success) {
                dispatch(deleteSubscriptionSuccess(json.msg, subscriptionId))
            } else {
                dispatch(deleteSubscriptionError(json.msg))
            }
        })
    }
}

export {requestAllSubscriptions,fetchSingleSubscription,
        createSubscription, deleteSubscription, updateForm}