import { combineReducers } from 'redux';
import user from './user';
import profile from './profile';

const rootReducer = combineReducers({
  user,
  profile
});

export default rootReducer;
