import {getRequest} from 'apis/common';
import {
  put,
  takeEvery,
  call,
  all,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {setTerms, setTermsSuccess} from 'store/reducer/termReducer';
import axios from 'axios';

export default function* termSaga() {
  yield takeLatest(setTerms, getTerms);
}

function* getTerms(action) {
  try {
    const result = yield call(() => getTermsApi(action.payload));
    console.log(result);
    yield put(setTermsSuccess(result.results));
  } catch (e) {
    console.log(e);
  }
}

const getTermsApi = id => {
  return getRequest(`/v1/board/terms/${id}/`);
};
