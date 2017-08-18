import {
    MAKERS_GET_FETCHING,
    MAKERS_GET_SUCCESS,
    MAKERS_GET_ERROR,
    MAKERS_FORM_CHANGED,
    MODEL_FORM_CHANGED,
    MAKER_CREATE_FETCHING,
    MAKER_CREATE_SUCCESS,
    MAKER_CREATE_ERROR,
    SINGLE_MAKER_GET_SUCCESS,


    MODEL_CREATE_FETCHING,
    MODEL_CREATE_SUCCESS,
    MODEL_CREATE_ERROR,


    MODEL_DELETE_FETCHING,
    MODEL_DELETE_SUCCESS,
    MODEL_DELETE_ERROR,

    MAKER_UPDATE_FETCHING,
    MAKER_UPDATE_SUCCESS,
    MAKER_UPDATE_ERROR 

} from '../actions/maker';

const defaultState = {
    isFetching: false,
    currentErrorMessage: '',
    currentInfoMessage: '',
    currentMaker: {
        _id: '',
        name: '',
        models: []
    },
    makers: [],
    currentModelName: '',
    currentModelId: ''
}

const maker = function(state = defaultState, action) {
    switch(action.type) {
        case MAKERS_GET_FETCHING:
            return {...state, isFinite: true}
        case MAKERS_GET_SUCCESS:
            return {...state, isFetching: false, makers: action.payload}
        case MAKERS_GET_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload}
        case MAKERS_FORM_CHANGED:
        console.log(action.payload)
            return {...state, currentMaker: {...state.currentMaker, name: action.payload.currentMakerName}}
        case MAKER_CREATE_FETCHING:
            return {...state, isFetching: true}
        case MAKER_CREATE_SUCCESS:
            return {...state, isFetching: false, currentInfoMessage: action.payload.currentInfoMessage,
                        currentErrorMessage: '' }
        case MAKER_CREATE_ERROR:
            return {...state, isFetching: false, currentErrorMessage: action.payload.currentErrorMessage,
                        currentInfoMessage: '' }

        case SINGLE_MAKER_GET_SUCCESS:
            return {...state, currentMaker: action.payload}
        

        case MODEL_FORM_CHANGED:
            return {...state, currentModelName: action.payload.currentModelName }
        case MODEL_CREATE_FETCHING:
            return {...state, isFetching: true }
        case MODEL_CREATE_SUCCESS:
            return {...state, isFetching: false, currentInfoMessage: action.payload,
                currentErrorMessage: '' }
        case MODEL_CREATE_ERROR:
            return {...state, isFetching: false, currentInfoMessage: '',
                currentErrorMessage: action.payload }

        case MODEL_DELETE_FETCHING:
            return {...state, isFetching: true }
        case MODEL_DELETE_SUCCESS:
            return {...state, isFetching: false, currentInfoMessage: action.payload.message,
                currentErrorMessage: '',
                makers: removeDeletedModelFromMakers(state.makers, action.payload.makerId,
                    action.payload.modelId),
                currentMaker: {...state.currentMaker,
                    models: removeDeletedModelFromCurrent(state.currentMaker.models, action.payload.modelId)} }
        case MODEL_DELETE_ERROR:
            return {...state, isFetching: false, currentInfoMessage: '',
                currentErrorMessage: action.payload }

        case MAKER_UPDATE_FETCHING:
            return {...state, isFetching: true }
        case MAKER_UPDATE_SUCCESS:
        debugger
            return {...state, isFetching: false,
                    currentInfoMessage: action.payload.currentInfoMessage,
                    currentErrorMessage: '', 
                    makers: updateMaker(state.makers, action.payload.maker) }
        case MAKER_UPDATE_ERROR:
            return {...state, isFetching: false, currentInfoMessage: '',
                currentErrorMessage: action.payload }

        default:
            return state
    }
}

function removeDeletedModelFromCurrent(arr, modelId) {
    return arr.filter(function (el){
        return el._id !== modelId
    })
}

function removeDeletedModelFromMakers(arr, makerId, modelId) {
    return arr.filter((maker) => {
            let makerCopy = maker;
            makerCopy.models = makerCopy.models.filter(function(el) {
                return el._id !== modelId && makerCopy._id !== makerId
            })
            return makerCopy
    })
}

function updateMaker(makers, makerForUpdate) {
    return makers.filter((el) => {
        if (el._id === makerForUpdate._id) {
            return makerForUpdate
        } else {
            return el
        }
    })
}

export default maker;
