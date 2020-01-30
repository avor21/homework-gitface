import {handleActions, combineActions} from 'redux-actions';
import {combineReducers} from "redux";
import {fetchUserRequest, fetchUserSuccess, fetchUserFailure} from "./actions";

const isFetching =  handleActions({
  [fetchUserRequest]: () => true,
  [combineActions(fetchUserSuccess, fetchUserFailure)]: () => false
  },
  false
);

const data =  handleActions({
    [fetchUserSuccess]: (state, action) => action.payload
  },
  null
);

const isFetched =  handleActions({
    [fetchUserRequest]: () => false,
    [combineActions(fetchUserSuccess, fetchUserFailure)]: () => true
  },
  false
);

const error =  handleActions({
    [fetchUserFailure]: (state, action) => action.payload
  },
  null
);

export default combineReducers({
  data,
  error,
  isFetching,
  isFetched
});