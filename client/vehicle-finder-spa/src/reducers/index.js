import { combineReducers } from 'redux'
import userReducer from './user'
import makerReducer from './maker'
import userManagementReducer from './user-management'
import articleReducer from './article'

const rootReducer = combineReducers({
    user: userReducer,
    maker: makerReducer,
    userManagement: userManagementReducer,
    article: articleReducer
})

export default rootReducer