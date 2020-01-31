import {take, call, select, put} from 'redux-saga/effects';
import {authRequest, authSuccess, logout, getIsAuthorize} from '../ducks/auth';
import {fetchUserSuccess, fetchUserFailure, fetchUserRequest} from "../ducks/users";
import {clearTokenApi, setTokenApi} from "../api";
import {getTokenFromLocalStorage, removeTokenFromLocalStorage, setTokenToLocalStorage} from "../localStorage";

/*
    FixMe: Не ловится logout()
 */

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
      yield put(fetchUserRequest());
      const action = yield take([fetchUserSuccess, fetchUserFailure]);
      if (action.type === fetchUserSuccess.toString()) {
        yield call(setTokenToLocalStorage, token);
        yield put(authSuccess());
      } else {
        yield put(logout());
      }
    } catch (error) {
      yield put(logout());
    }


    yield take(logout);
    console.log('where is logout?!');
    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
};
