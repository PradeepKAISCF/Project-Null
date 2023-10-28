import { combineReducers } from "redux";
import authReducers from "./auth";
import currentUserReducer from './currentUserReducer'
import questionReducer from './questions'
import usersReducer from "./users";

export default combineReducers({
    authReducers, currentUserReducer,questionReducer, usersReducer
})