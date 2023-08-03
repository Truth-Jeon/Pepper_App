import {postRequest} from 'apis/common';
import {
  put,
  takeEvery,
  call,
  all,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {
  requestTransacion,
  requestTransacionSuccess,
} from 'store/reducer/transactionReducer';

export default function* transactionSaga() {
  yield takeLatest(requestTransacion, transactionFunc);
}

function* transactionFunc(action) {
  try {
    const result = yield call(() => postRequestTransaction(action.payload));
    yield put(requestTransacionSuccess(result));
  } catch (e) {
    console.log(e.response?.data);
  }
}

const postRequestTransaction = payload => {
  return postRequest('/v1/account/transaction/', payload);
};
