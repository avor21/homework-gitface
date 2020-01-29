import { createActions, handleActions } from 'redux-actions';

const actionCreators = createActions({
  AUTH_REQUEST: undefined
});



export const { authRequest } = actionCreators;