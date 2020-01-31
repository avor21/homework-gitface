import {handleActions} from "redux-actions";
import {combineReducers} from "redux";
import {authSuccess, logout} from "./actions";

const isAuthorized = handleActions({
 [authSuccess]: () => true,
 [logout]: () => false
 },
 false
);

export default combineReducers({
 isAuthorized
});