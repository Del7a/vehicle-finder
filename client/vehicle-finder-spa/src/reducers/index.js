import { combineReducers } from 'redux'
import userReducer from './user'
import makerReducer from './maker'

const rootReducer = combineReducers({
    user: userReducer,
    maker: makerReducer
})

export default rootReducer