import { call, put } from 'redux-saga/effects';
import { API_BASE } from '../containers/App/constants';
import request from './request';
import objectToFormData from './objectToFormData';

function* commonCall(payload) {
  try {
    const response = yield call(request, payload.requestURL, payload.options);
    yield put(payload.onSuccess(response));
  } catch (err) {
    let error = null;
    try {
      error = yield call(() => err.response.json());
    } catch (e) {
      console.log('response not json err', e);
    }
    yield put(payload.onError(error));
  }
}

class Api {
  static get = (apiUri, onSuccess, onError, token) =>
    function* getApiSetup() {
      const requestURL = `${API_BASE}${apiUri}`;
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      };
      yield call(commonCall, { onError, onSuccess, options, requestURL });
    };

  static post = (apiUri, onSuccess, onError, data, token) =>
    function* postApiSetup() {
      const requestURL = `${API_BASE}${apiUri}`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(data),
      };
      yield call(commonCall, { onError, onSuccess, options, requestURL });
    };

  static put = (apiUri, onSuccess, onError, data, token) =>
    function* putApiSetup() {
      const requestURL = `${API_BASE}${apiUri}`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(data),
      };
      yield call(commonCall, { onError, onSuccess, options, requestURL });
    };

  static multipartPost = (apiUri, onSuccess, onError, data, document = {}, token) =>
    function* multiPartApiSetup() {
      const requestURL = `${API_BASE}${apiUri}`;
      let multipartData = new FormData();
      multipartData = objectToFormData(data, multipartData);
      Object.keys(document).map(each => {
        if (Object.prototype.toString.call(document) === '[object Array]') {
          document.map(fileObj => multipartData.append([Object.keys(fileObj)[0]], Object.values(fileObj)[0]));
        } else {
          multipartData.append([each], document[each]);
        }
        return null;
      });
      const options = {
        method: 'POST',
        body: multipartData,
        headers: {
          Authorization: token,
        },
      };
      yield call(commonCall, { onError, onSuccess, options, requestURL });
    };

  static multipartPut = (apiUri, onSuccess, onError, data, document = {}, token) =>
    function* multiPartApiSetup() {
      const requestURL = `${API_BASE}${apiUri}`;
      let multipartData = new FormData();
      multipartData = objectToFormData(data, multipartData);
      Object.keys(document).map(each => {
        if (Object.prototype.toString.call(document) === '[object Array]') {
          document.map(fileObj => multipartData.append([Object.keys(fileObj)[0]], Object.values(fileObj)[0]));
        } else {
          multipartData.append([each], document[each]);
        }
        return null;
      });
      const options = {
        method: 'PUT',
        body: multipartData,
        headers: {
          Authorization: token,
        },
      };
      yield call(commonCall, { onError, onSuccess, options, requestURL });
    };

  static patch = (apiUri, onSuccess, onError, data, token) =>
    function* patchApiSetup() {
      const requestURL = `${API_BASE}${apiUri}`;
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(data),
      };
      yield call(commonCall, { onError, onSuccess, options, requestURL });
    };

  static delete = (apiUri, onSuccess, onError, token) =>
    function* deleteApiSetup() {
      const requestURL = `${API_BASE}${apiUri}`;
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      };
      yield call(commonCall, { onError, onSuccess, options, requestURL });
    };
}

export default Api;
