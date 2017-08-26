export const ALL_MESSAGE_THREADS_GET_FETCHING = 'MESSAGE_THREADS_GET_FETCHING'
export const ALL_MESSAGE_THREADS_GET_SUCCESS = 'ALL_MESSAGE_THREADS_GET_SUCCESS'
export const ALL_MESSAGE_THREADS_GET_ERROR = 'ALL_MESSAGE_THREADS_GET_ERROR'

export const MESSAGE_THREAD_POST_FETCHING = 'MESSAGE_THREAD_POST_FETCHING'
export const MESSAGE_THREAD_POST_SUCCESS = 'MESSAGE_THREAD_POST_SUCCESS'
export const MESSAGE_THREAD_POST_ERROR = 'MESSAGE_THREAD_POST_ERROR'

export const ALL_MESSAGES_GET_FETCHING = 'ALL_MESSAGES_GET_FETCHING'
export const ALL_MESSAGES_GET_SUCCESS = 'ALL_MESSAGES_GET_SUCCESS'
export const ALL_MESSAGES_GET_ERROR = 'ALL_MESSAGES_GET_ERROR'

export const MESSAGE_PUT_FETCHING = 'MESSAGE_PUT_FETCHING'
export const MESSAGE_PUT_SUCCESS = 'MESSAGE_PUT_SUCCESS'
export const MESSAGE_PUT_ERROR = 'MESSAGE_PUT_ERROR'

export const MESSAGE_READ_FETCHING = 'MESSAGE_READ_FETCHING'
export const MESSAGE_READ_SUCCESS = 'MESSAGE_READ_SUCCESS'
export const MESSAGE_READ_ERROR = 'MESSAGE_READ_ERROR'

export const SET_CURRENT_MESSAGE_THREAD = 'SET_CURRENT_MESSAGE_THREAD';

/**
 * Message threads get
 */

function allMessageThreadsGetFetching() {
    return {
        type: ALL_MESSAGE_THREADS_GET_FETCHING
    }
}

function allMessageThreadsGetSuccess(messageThreads) {
    return {
        type: ALL_MESSAGE_THREADS_GET_SUCCESS,
        payload: { messageThreads: messageThreads }
    }
}

function allMessageThreadsGetError(msg) {
    return {
        type: ALL_MESSAGE_THREADS_GET_SUCCESS,
        payload: { message: msg }
    }
}

function requestAllMessageThreads() {
    return dispatch => {
        dispatch(allMessageThreadsGetFetching())
        return fetch(`http://localhost:3000/api/messages`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                console.log(json);
                if (json.success) {
                    dispatch(allMessageThreadsGetSuccess(json.threads))
                } else {
                    dispatch(allMessageThreadsGetError(json.msg))
                }                
            })
        
    }
}

/**
 * Message threads post
 */

function messageThreadPostFetching() {
    return {
        type: MESSAGE_THREAD_POST_FETCHING
    }
}

function messageThreadPostSuccess(messageThread, msg) {
    return {
        type: MESSAGE_THREAD_POST_SUCCESS,
        payload: { messageThread: messageThread, message: msg }
    }
}

function messageThreadPostError(msg) {
    return {
        type: MESSAGE_THREAD_POST_ERROR,
        payload: { message: msg }
    }
}

function addMessageToArticle(offerId, recipientId, newMessage) {
    debugger
    return dispatch => {
        dispatch(messageThreadPostFetching())
        return fetch(`http://localhost:3000/api/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    concernedOffer: offerId,
                    receiveUser: recipientId,
                    msg: newMessage
                })
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                console.log(json);
                if(json.success) {
                    dispatch(messageThreadPostSuccess(json.thread, json.msg))
                } else {
                    dispatch(messageThreadPostError(json.msg))
                }                
            })
    }
}

/**
 * All messages in thread get
 */

function allMessagesGetFetching() {
    return {
        type: ALL_MESSAGES_GET_FETCHING
    }
}

function allMessagesGetSuccess(thread) {
    return {
        type: ALL_MESSAGES_GET_SUCCESS,
        payload: { thread: thread }
    }
}

function allMessagesGetError() {
    return {
        type: ALL_MESSAGES_GET_ERROR
    }
}

function requestAllMessages(messageThread) {
    return dispatch => {
        dispatch(allMessagesGetFetching())
        return fetch(`http://localhost:3000/api/messages/${messageThread._id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                console.log(json);
                if(json.success) {
                    dispatch(allMessagesGetSuccess(json.thread))
                } else {
                    dispatch(allMessagesGetError())
                }                
            })
    }
}

/**
 * Message put
 */

function messagePutFetching() {
    return {
        type: MESSAGE_PUT_FETCHING
    }
}

function messagePutSuccess(chatMessage, msg) {
    return {
        type: MESSAGE_PUT_SUCCESS,
        payload: {chatMessage: chatMessage, message: msg}
    }
}

function messagePutError(msg) {
    return {
        type: MESSAGE_PUT_ERROR,
        payload: {message: msg}
    }
}

function sendMessage(message, messageThread) {
     return dispatch => {
         debugger
        dispatch(messagePutFetching())
        return fetch(`http://localhost:3000/api/messages/${messageThread._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({msg: message})
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                console.log(json);
                if(json.success) {
                    dispatch(messagePutSuccess(message, json.msg))
                } else {
                    dispatch(messagePutError(json.msg))
                }                
            })
    }
}

/**
 * Message patch
 */

function messageReadFetching() {
    return {
        type: MESSAGE_READ_FETCHING
    }
}

function messageReadSuccess(msg) {
    return {
        type: MESSAGE_READ_SUCCESS,
        payload: { message: msg}
    }
}

function messageReadError(msg) {
    return {
        type: MESSAGE_READ_ERROR,
        payload: {message: msg}
    }
}

function markAsRead(messageThread) {
     return dispatch => {
        dispatch(messagePutFetching())
        return fetch(`http://localhost:3000/api/messages/${messageThread._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(json => {
                console.log(json);
                if(json.success) {
                    dispatch(messagePutSuccess(json.msg))
                } else {
                    dispatch(messagePutError(json.msg))
                }                
            })
    }
}

function setCurrentMessageThread(messageThread) {
    return {
        type: SET_CURRENT_MESSAGE_THREAD,
        payload: messageThread
    }
}

function changeCurrentMessageThread(messageThread) {
    return dispatch => {
        dispatch(setCurrentMessageThread(messageThread))
    }
}

export { requestAllMessageThreads, addMessageToArticle, requestAllMessages, 
        sendMessage, markAsRead, changeCurrentMessageThread}