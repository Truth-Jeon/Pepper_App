import {getRequest, postRequest} from 'apis/common';
import {
  put,
  takeEvery,
  call,
  all,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {
  setToken,
  setAccount,
  setCreateAccount,
  setAccountSuccess,
  setCreateAccountSuccess,
  setPrivateKey,
  setAccessTokenRefreshRequest,
  setAccessTokenRefreshFail,
  setAccessTokenRefreshSuccess,
} from 'store/reducer/accountReducer';
import axios from 'axios';
import {toastShowTop} from 'helper/toastHelper';

export default function* accountSaga() {
  yield takeLatest(setCreateAccount, createAccount);
  yield takeLatest(setAccount, getAccount);
  yield takeLatest(setAccessTokenRefreshRequest, setAccessToken);
}

function* setAccessToken(action) {
  const refresh = yield select(state => state.account.refresh);
  try {
    const {access} = yield call(() => refreshTokenAPI(refresh));
    yield put(setAccessTokenRefreshSuccess(access));
  } catch (e) {
    // 리플래쉬 토근도 만료가 되면 로그인 페이지로 이동
  }
}

function* createAccount(action) {
  try {
    const result = yield call(() => createAccountAPI(action.payload));
    yield put(setCreateAccountSuccess(result));
    yield put(setPrivateKey(action.payload.private_key));
  } catch (e) {
    toastShowTop('error', e.response?.data?.message);
  }
}

function* getAccount() {
  try {
    const result = yield call(() => getAccountAPI());
    yield put(setAccountSuccess(result));
  } catch (e) {
    console.log(e.response?.data);
  }
}

const createAccountAPI = payload => {
  return postRequest('/v1/account/create/', payload);
};

const getAccountAPI = payload => {
  return getRequest('/v1/account/');
};

const refreshTokenAPI = refresh => {
  return postRequest('/api/token/refresh/', {
    refresh: refresh,
  });
};
