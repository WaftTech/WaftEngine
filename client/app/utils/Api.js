import { call, put } from 'redux-saga/effects';
import { API_BASE } from 'containers/App/constants';
import objectToFormData from './objectToFormData';
import request from './request';

class Api {
  /**
   * Generic api data loader
   */
  static dataLoader(apiUri, onSuccess, onError, data, token, metaData) {
    return function* commonApiSetup() {
      const baseUrl = API_BASE;
      const requestURL = `${baseUrl}${apiUri}`;
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        };
        if (data !== undefined) {
          options.method = metaData === 'put' ? 'PUT' : 'POST';
          options.body = JSON.stringify(data);
        }
        const response = yield call(request, requestURL, options);
        yield put(onSuccess(response));
        // if (response.success) {
        //   yield put(onSuccess(response));
        // } else {
        //   yield put(onError(response));
        // }
      } catch (err) {
        // console.log('unexpected error', err);
        // yield put(onError(err));
        let error = null;
        try {
          error = yield call(() => err.response.json());
        } catch (e) {
          console.log('response not json err', e);
        }
        yield put(onError(error));
      }
    };
  }

  static multipartPost(
    apiUri,
    onSuccess,
    onError,
    data,
    document,
    token,
    metaData,
  ) {
    return function* multiPartApiSetup() {
      const requestURL = `${API_BASE}${apiUri}`;
      let multipartData = new FormData();
      multipartData = objectToFormData(data, multipartData);
      if (Object.prototype.toString.call(document) === '[object Array]') {
        document.map(file => multipartData.append('file', file));
      } else {
        multipartData.append('file', document);
      }
      try {
        const options = {
          method: metaData === 'put' ? 'PUT' : 'POST',
          body: multipartData,
          headers: {
            Authorization: token,
          },
        };
        const response = yield call(request, requestURL, options);
        yield put(onSuccess(response));
        // if (response.success) {
        //   yield put(onSuccess(response));
        // } else {
        //   yield put(onError(response));
        // }
      } catch (err) {
        // console.log('unexpected error', err);
        let error = null;
        try {
          error = yield call(() => err.response.json());
        } catch (e) {
          console.log('response not json err', e);
        }
        yield put(onError(error));
      }
    };
  }
  /*
   * Shorthand GET function
   */
  static get(apiUri, onSuccess, onError) {
    return this.dataLoader(apiUri, onSuccess, onError);
  }
  /*
   * Shorthand POST function
   */
  static post(apiUri, onSuccess, onError, data, token) {
    return this.dataLoader(apiUri, onSuccess, onError, data, token);
  }
  /*
   * Shorthand PUT function
   */
  static put(apiUri, onSuccess, onError, data, token, metaData = 'put') {
    return this.dataLoader(apiUri, onSuccess, onError, data, token, metaData);
  }
  /*
   * Shorthand PATCH function
   */
  static patch(apiUri, onSuccess, onError, data, token) {
    return function* patchApiSetup() {
      const requestURL = `${API_BASE}${apiUri}`;
      try {
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(data),
        };
        const response = yield call(request, requestURL, options);
        yield put(onSuccess(response));
        // if (response.success) {
        //   yield put(onSuccess(response));
        // } else {
        //   yield put(onError(response));
        // }
      } catch (err) {
        // console.log('unexpected error', err);
        let error = null;
        try {
          error = yield call(() => err.response.json());
        } catch (e) {
          console.log('response not json err', e);
        }
        yield put(onError(error));
      }
    };
  }
  /*
   * Shorthand DELETE function
   */
  static delete(apiUri, onSuccess, onError, token) {
    return function* deleteApiSetup() {
      const requestURL = `${API_BASE}${apiUri}`;
      try {
        // Call our request helper (see 'utils/request')
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        };
        const response = yield call(request, requestURL, options);
        yield put(onSuccess(response));
        // if (response.success) {
        //   yield put(onSuccess(response));
        // } else {
        //   yield put(onError(response));
        // }
      } catch (err) {
        // console.log('unexpected error', err);
        let error = null;
        try {
          error = yield call(() => err.response.json());
        } catch (e) {
          console.log('response not json err', e);
        }
        yield put(onError(error));
      }
    };
  }
}

export default Api;
