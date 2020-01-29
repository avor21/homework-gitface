import {handleActions} from "redux-actions";
import {combineReducers} from "redux";
import {authRequest, logout} from "./actions";

const isAuthorized = handleActions({
 [authRequest.toString()]: () => true,
 [logout.toString()]: () => false
 },
 false
);

export default combineReducers({
 isAuthorized
});