import {
    ALL_MESSAGE_THREADS_GET_FETCHING,
    ALL_MESSAGE_THREADS_GET_SUCCESS,
    ALL_MESSAGE_THREADS_GET_ERROR,
    MESSAGE_THREAD_POST_FETCHING,
    MESSAGE_THREAD_POST_SUCCESS ,
    MESSAGE_THREAD_POST_ERROR,
    ALL_MESSAGES_GET_FETCHING,
    ALL_MESSAGES_GET_SUCCESS,
    ALL_MESSAGES_GET_ERROR,
    MESSAGE_PUT_FETCHING,
    MESSAGE_PUT_SUCCESS,
    MESSAGE_PUT_ERROR,
    MESSAGE_READ_FETCHING,
    MESSAGE_READ_SUCCESS,
    MESSAGE_READ_ERROR
} from '../actions/messages'

const defaultMessageThread = {
    sendUser: '',
    recieveUser: '',
    cuncernedOffer: '',
    messages: [],
    senderLastSeen: '',
    recieverLastSeen: '',
    updatedAt: '',
    createdAt: '',
}

const defaultState = {
    isFetching: false,
    currentInfoMessage: '',
    currentErrorMessage: '',
    messageThreads: [],
    currentMessageThread: defaultMessageThread
}

const messages = function (state = defaultState, action) {
    switch(action.type) {
        case ALL_MESSAGE_THREADS_GET_FETCHING:
            return {...state, isFetching: true, currentErrorMessage: '', currentInfoMessage: ''}
        case ALL_MESSAGE_THREADS_GET_SUCCESS:
            return {...state, isFetching: false, messageThreads: action.payload.messageThreads}
        case ALL_MESSAGE_THREADS_GET_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message}
        
        case MESSAGE_THREAD_POST_FETCHING:
            return {...state, isFetching: true, currentErrorMessage: '', currentInfoMessage: ''}
        case MESSAGE_THREAD_POST_SUCCESS:
            return {...state, isFetching: false, currentInfoMessage: action.payload.message, 
                    messageThreads: addElementToArray(state.messageThreads, action.payload.messageThread)}
        case MESSAGE_THREAD_POST_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message}

        case ALL_MESSAGES_GET_FETCHING:
            return {...state, isFetching: true, currentErrorMessage: '', currentInfoMessage: ''}
        case ALL_MESSAGES_GET_SUCCESS:
            return {...state, isFetching: false, currentInfoMessage: action.payload.message, 
                    messages: action.payload.messages}
        case ALL_MESSAGES_GET_ERROR:
            return {...state, isFetching: false}

        case MESSAGE_PUT_FETCHING:
            return {...state, isFetching: true, currentErrorMessage: '', currentInfoMessage: ''}
        case MESSAGE_PUT_SUCCESS:
            return {...state, isFetching: false, currentInfoMessage: action.payload.message, 
                    messages: addElementToArray(state.currentMessageThread.messages, action.payload.chatMessage)}
        case MESSAGE_PUT_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message}
        
        case MESSAGE_READ_FETCHING:
            return {...state, isFetching: true, currentErrorMessage: '', currentInfoMessage: ''}
        case MESSAGE_READ_SUCCESS:
            return {...state, isFetching: false, currentInfoMessage: action.payload.message}
        case MESSAGE_READ_ERROR:
           return {...state, isFetching: false, currentErrorMessage: action.payload.message}
        
        default: 
            return state
    }
}

function addElementToArray(arr, messageThread)
{
    const newArr = arr.spice()
    newArr.push(messageThread)
    return newArr
}

export default messages