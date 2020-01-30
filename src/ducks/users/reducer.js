import {handleActions} from 'redux-actions';
import {combineReducers} from "redux";
import {fetchTokenOwnerRequest} from "./actions";

const isFetching =  handleActions({
  [fetchTokenOwnerRequest]: () => true
  },
  false
);

const data =  handleActions({
    [fetchTokenOwnerRequest]: () => null
  },
  null
);

export default combineReducers({
  isFetching,
  data
});