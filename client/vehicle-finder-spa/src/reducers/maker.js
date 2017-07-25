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



    SINGLE_MAKER_UPDATE_SUCCESS,

    MODEL_CREATE_FETCHING,
    MODEL_CREATE_SUCCESS,
    MODEL_CREATE_ERROR,


    MODEL_DELETE_FETCHING,
    MODEL_DELETE_SUCCESS,
    MODEL_DELETE_ERROR

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
        

        case SINGLE_MAKER_UPDATE_SUCCESS:
            return {...state, isFetching: false, currentInfoMessage: action.payload.currentInfoMessage,
                        currentErrorMessage: '' }

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
                    models: remodeDeletedModelFromCurrent(state.currentMaker.models, action.payload.modelId)} }
        case MODEL_DELETE_ERROR:
            return {...state, isFetching: false, currentInfoMessage: '',
                currentErrorMessage: action.payload }

        default:
            return state
    }
}

function remodeDeletedModelFromCurrent(arr, modelId) {
    return arr.filter(function (el){
        return el._id !== modelId
    })
}

function removeDeletedModelFromMakers(arr, makerId, modelId) {
    return arr.filter(function(maker) {
            let makerCopy = maker;
            makerCopy.models = makerCopy.models.filter(function(el) {
                return el._id !== modelId && makerCopy._id !== makerId
            })
            return makerCopy
    })
}

export default maker;