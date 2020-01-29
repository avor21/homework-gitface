import {createActions} from "redux-actions";

export const { authRequest, logout } = createActions(
  'AUTH_REQUEST',
  'LOGOUT'
);