import axios from 'axios';
import {getToken} from '../../App';
import {wrapRequest, instance} from './index';
import {ROOT_URL} from './url';
// 기본 post 요청
export const postRequest = wrapRequest(async (url, data, token = true) => {
  return instance().post(url, {...data}, {...token});
});
// 기본 get 요청
export const getRequest = wrapRequest(async (url, data, token = true) => {
  return instance().get(url, {params: data, token: token});
});
// 기본 put 요청
export const putRequest = wrapRequest(async (url, data, token = true) => {
  return instance().put(url, {...data}, {...token});
});

// 기본 patch 요청
export const patchRequest = wrapRequest(async (url, data, token = true) => {
  return instance().patch(url, {token: token});
});

// 기본 delete 요청
export const deleteRequest = wrapRequest(async (url, data, token = true) => {
  return instance().delete(url, {token: token});
});

export const postFormRequest = async (url, data, istoken = true) => {
  try {
    let root = ROOT_URL;

    let token;
    if (istoken) {
      token = getToken();
      const result = await axios({
        url: root + url,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
        data: data,
        method: 'POST',
      });
      console.log(result);
      return result.data;
    } else {
      console.log('data:', data);
      const result = await axios({
        url: root + url,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
          // Authorization: `Token ${token}`,
        },
        data: data,
        method: 'POST',
      }).catch(e => {
        throw e;
      });
      return result.data;
    }
  } catch (e) {
    throw e;
  }
};

export const putFormRequest = async (url, data, istoken = true) => {
  try {
    let root = ROOT_URL;

    let token;
    if (istoken) {
      token = getToken();
      const result = await axios({
        url: root + url,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
        data: data,
        method: 'PUT',
      });
      // console.log(result);
      return result.data;
    } else {
      // console.log('data:', data);
      const result = await axios({
        url: root + url,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
          // Authorization: `Token ${token}`,
        },
        data: data,
        method: 'PUT',
      }).catch(e => {
        console.log(e);
      });
      return result.data;
    }
  } catch (e) {
    throw e;
  }
};
