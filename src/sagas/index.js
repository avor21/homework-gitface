import { fork } from 'redux-saga/effects';
import { fetchUserWatch } from './users';
import { authorizeWatcher } from './auth';

export default function*() {
  yield fork(authorizeWatcher);
  yield fork(fetchUserWatch);
}
