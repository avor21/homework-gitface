import {take,  call, select, put} from 'redux-saga/effects';
import {authRequest, logout, getIsAuthorize} from '../ducks/auth';
import {clearTokenApi, setTokenApi} from "../api";
import {getTokenFromLocalStorage, removeTokenFromLocalStorage, setTokenToLocalStorage} from "../localStorage";

export const authFlow = function * () {
  while (true) {
    const isAuthorized = yield select(getIsAuthorize);
    const localStorageToken = yield call(getTokenFromLocalStorage);

    let token;

    if(!isAuthorized && localStorageToken) {
      token = yield call(getTokenFromLocalStorage);
      yield put(authRequest());
    } else {
      const action = yield take(authRequest);
      token = action.payload;
    }

    yield call(setTokenApi, token);
    yield call(setTokenToLocalStorage, token);

    yield take(logout);

    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
};
