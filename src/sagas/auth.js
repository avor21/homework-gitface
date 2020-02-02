import {fork, take, call, select, put} from 'redux-saga/effects';
import {authRequest, authSuccess, logout, getIsAuthorize} from '../ducks/auth';
import {clearTokenApi, getTokenOwner, setTokenApi} from "../api";
import {getTokenFromLocalStorage, removeTokenFromLocalStorage, setTokenToLocalStorage} from "../localStorage";


export const authorizeWatcher = function * () {
  while (true) {
    const isAuthorized = yield select(getIsAuthorize);
    const localStorageToken = yield call(getTokenFromLocalStorage);

    let token;

    if (localStorageToken && !isAuthorized) {
      token = localStorageToken;
      yield put(authSuccess());
    } else {
      const action = yield take(authRequest);
      token = action.payload;
    }

    yield fork(loginFlow, token);
    yield fork(logoutSaga);
  }
};

const loginFlow = function * (token) {
  try {
    yield call(setTokenApi, token);
    const response = yield call(getTokenOwner);
    if (response) {
      yield call(setTokenToLocalStorage, token);
      const isAuthorized = yield select(getIsAuthorize);
      if (!isAuthorized) {
        yield put(authSuccess());
      }
    }
  } catch (error) {
    yield put(logout());
  }
};


const logoutSaga = function * () {
  yield take(logout);

  yield call(removeTokenFromLocalStorage);
  yield call(clearTokenApi);
};
