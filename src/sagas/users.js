import { takeEvery, call } from 'redux-saga/effects';
import { fetchTokenOwnerRequest } from '../ducks/users'
import {getTokenOwner} from "../api";

export const fetchUserWatch = function* () {
  yield takeEvery(fetchTokenOwnerRequest, fetchUserSaga);
};

const fetchUserSaga = function * () {

  const response = yield call(getTokenOwner);
  console.log(response);
};
