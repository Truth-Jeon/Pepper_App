import {getRequest} from 'apis/common';
import {
  put,
  takeEvery,
  call,
  all,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {setNotices, setNoticesSuccess} from 'store/reducer/noticeReducer';
import axios from 'axios';

export default function* noticeSaga() {
  yield takeLatest(setNotices, getNotices);
}

function* getNotices() {
  try {
    const result = yield call(getNoticesAPI);
    console.log('notices:', result);
    yield put(setNoticesSuccess(result.results));
  } catch (e) {
    console.log(e);
  }
}

const getNoticesAPI = () => {
  return getRequest('/v1/board/notice/');
};
