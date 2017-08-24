import { combineReducers } from 'redux'
import userReducer from './user'
import makerReducer from './maker'
import userManagementReducer from './user-management'
import articleReducer from './article'
import subscriptionReducer from './subscription'

const rootReducer = combineReducers({
    user: userReducer,
    maker: makerReducer,
    userManagement: userManagementReducer,
    article: articleReducer,
    subscription: subscriptionReducer
})

export default rootReducer