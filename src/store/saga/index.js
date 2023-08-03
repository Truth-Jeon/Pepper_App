import {all} from 'redux-saga/effects';
import noticeSaga from './noticeSaga';
import termSaga from './termSaga';
import testSaga from './testSaga';
import accountSaga from './accountSaga';
import transactionSaga from './transactionSaga';
import appConfigSaga from './appConfigSaga';

export default function* rootSaga() {
  yield all([
    testSaga(),
    termSaga(),
    noticeSaga(),
    accountSaga(),
    transactionSaga(),
    appConfigSaga(),
  ]);
}
