import {handleAction} from "redux-actions";
import {combineReducers} from "redux";
import {authRequest} from "./actions";

const isAuthorized = handleAction(
  authRequest,
  () => true,
  false
);

export default combineReducers({
 isAuthorized
});