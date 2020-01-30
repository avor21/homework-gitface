import { takeEvery, call, put } from 'redux-saga/effects';
import {fetchUserRequest, fetchUserSuccess, fetchUserFailure } from '../ducks/users'
import {getTokenOwner} from "../api";

export const fetchUserWatch = function* () {
  yield takeEvery(fetchUserRequest, fetchUserSaga);
};

const fetchUserSaga = function * () {
  try {
    const response = yield call(getTokenOwner);
    yield put(fetchUserSuccess(response.data));

  } catch (error) {
    yield put(fetchUserFailure(error))
  }

};
