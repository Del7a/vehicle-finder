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
    MESSAGE_READ_ERROR,

    SET_CURRENT_MESSAGE_THREAD
} from '../actions/messages'

const defaultMessage = {
    _id: '',
    from: '',
    createdAt: '',
    body: ''
}

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
                    currentMessageThread: action.payload.thread}
        case ALL_MESSAGES_GET_ERROR:
            return {...state, isFetching: false}

        case MESSAGE_PUT_FETCHING:
            return {...state, isFetching: true, currentErrorMessage: '', currentInfoMessage: ''}
        case MESSAGE_PUT_SUCCESS:
            return {...state, isFetching: false, currentInfoMessage: action.payload.message, 
                    currentMessageThread: {...state.currentMessageThread,
                        messages: addNewMessage(state.currentMessageThread.messages, action.payload.chatMessage)}}
        case MESSAGE_PUT_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.message}
        
        case MESSAGE_READ_FETCHING:
            return {...state, isFetching: true, currentErrorMessage: '', currentInfoMessage: ''}
        case MESSAGE_READ_SUCCESS:
            return {...state, isFetching: false, currentInfoMessage: action.payload.message}
        case MESSAGE_READ_ERROR:
           return {...state, isFetching: false, currentErrorMessage: action.payload.message}
        
        case SET_CURRENT_MESSAGE_THREAD:
           return {...state, currentMessageThread: action.payload}

        default: 
            return state
    }
}

function addNewMessage(arr, newMessageText) {
    let sampleMessage = {...defaultMessage}
    sampleMessage.body = newMessageText;
    sampleMessage.createdAt = new Date().toJSON()
    sampleMessage._id = Date.now();
    sampleMessage
    return addElementToArray(arr, sampleMessage)
}

function addElementToArray(arr, item) {
    debugger
    const newArr = arr.slice()
    newArr.push(item)
    return newArr
}

export default messages