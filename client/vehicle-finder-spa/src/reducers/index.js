import { combineReducers } from 'redux'
import userReducer from './user'
import makerReducer from './maker'
import userManagementReducer from './user-management'

const rootReducer = combineReducers({
    user: userReducer,
    maker: makerReducer,
    userManagement: userManagementReducer
})

export default rootReducer