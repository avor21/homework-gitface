import {take,  call, select, put} from 'redux-saga/effects';
import {authRequest, authSuccess, logout, getIsAuthorize} from '../ducks/auth';
import {fetchUserSuccess} from "../ducks/users";
import {clearTokenApi, getTokenOwner, setTokenApi} from "../api";
import {getTokenFromLocalStorage, removeTokenFromLocalStorage, setTokenToLocalStorage} from "../localStorage";

export const authFlow = function * () {
  while (true) {
    const isAuthorized = yield select(getIsAuthorize);
    const localStorageToken = yield call(getTokenFromLocalStorage);

    let token;

    if(!isAuthorized && localStorageToken) {
      token = localStorageToken;
      yield put(authSuccess());
    } else {
      const action = yield take(authRequest);
      token = action.payload;
    }

    try {
      yield call(setTokenApi, token);
      const response = yield call(getTokenOwner);
      if (response.data) {
        yield call(setTokenToLocalStorage, token);
        yield put(fetchUserSuccess(response.data));
        yield put(authSuccess());
      }
    } catch (error) {
      yield put(logout());
    }


    yield take(logout);
    console.log('--1')
    yield call(removeTokenFromLocalStorage);
    console.log('--2')
    yield call(clearTokenApi);
    console.log('--3')
  }
};
