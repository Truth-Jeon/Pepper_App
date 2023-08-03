import axios from 'axios';
import {getToken} from '../../App';
import {ROOT_URL} from './url';
import {setAccessTokenRefreshRequest} from 'store/reducer/accountReducer';
import {store} from 'store/index';

export const wrapRequest = func => {
  return async (...args) => {
    const res = await func(...args);
    if (res && res.data && res.code && res.code !== 0) {
      throw res;
    } else {
      // 성공하면 data를 return
      return res.data;
    }
  };
};

export const instance = () => {
  let token = null;
  const dispatch = store.dispatch;
  console.log('ROOT_URL :', ROOT_URL);
  const _instance = axios.create({
    baseURL: ROOT_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  });

  _instance.interceptors.request.use(
    function (config) {
      if (config.method !== 'get') {
        if (
          config.url === '/v1/auth/kakao-register/' ||
          config.url === '/v1/auth/kakao-login/' ||
          config.url === '/v1/account/create/' ||
          config.url === '/api/token/refresh/'
        ) {
          console.log('NOT TOKEN');
          token = null;
        } else {
          token = getToken();
        }
      } else {
        if (config.token === false) {
          token = null;
        } else {
          token = getToken();
        }
      }
      console.log('token:', token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    function (error) {
      // 요청 에러 처리를 작성합니다.
      return Promise.reject(error);
    },
  );

  _instance.interceptors.response.use(
    function (response) {
      /*
          http status가 200인 경우
          응답 바로 직전에 대해 작성합니다.
          .then() 으로 이어집니다.
        */
      return response;
    },

    function (error) {
      if (error?.response?.status === 401) {
        // Token not Valied
        if (error?.response?.data?.code === 'token_not_valid') {
          dispatch(setAccessTokenRefreshRequest());
        }
      }
      /*
          http status가 200이 아닌 경우
          응답 에러 처리를 작성합니다.
          .catch() 으로 이어집니다.
      */
      return Promise.reject(error);
    },
  );
  return _instance;
};
