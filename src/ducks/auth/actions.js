import {createActions} from "redux-actions";

export const { authRequest, authSuccess, logout } = createActions(
  'AUTH_REQUEST',
  'AUTH_SUCCESS',
  'LOGOUT'
);