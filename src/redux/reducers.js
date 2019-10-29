import {combineReducers} from 'redux'
import loginReducer from './loginReducer.js';

const rootReducer = combineReducers({
    user:loginReducer
})
export default rootReducer;