import { takeLatest, call, select, put, fork, take, cancel } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import Api from 'utils/Api';
import { LOCATION_CHANGE, push } from 'connected-react-router';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectEmail, makeSelectPassword } from './selectors';
import { setUser, setToken } from '../App/actions';

const validate = data => {
  const errors = {};
  if (!data.email) errors.email = 'email is required';
  if (!data.password) errors.password = 'password is required';
  return { errors, isValid: !Object.keys(errors).length };
};

function* redirectOnSuccess(redirect) {
  const { payload } = yield take(types.LOGIN_SUCCESS);
  const { token, data } = payload;
  yield put(setUser(data));
  yield put(setToken(token));
  window.localStorage.setItem('token', token);
  if (redirect) {
    yield put(push(redirect));
  } else {
    yield put(push('/user/homepage'));
  }
}

function* loginAction(action) {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const data = { email, password };
  const errors = validate(data);
  if (errors.isValid) {
    const successWatcher = yield fork(redirectOnSuccess, action.redirect);
    yield put(actions.setStoreValue('loading', true));
    yield fork(Api.post('user/login', actions.loginSuccess, actions.loginFailure, data));
    yield put(actions.setStoreValue('loading', false));
    yield take([LOCATION_CHANGE, types.LOGIN_FAILURE]);
    yield cancel(successWatcher);
  } else {
    yield put(actions.setStoreValue({ key: 'errors', value: fromJS(errors.errors) }));
  }
}

function* loginFailure(action) {
  if (action.payload && action.payload.errors && typeof action.payload.errors === 'object') {
    yield put(actions.setStoreValue({ key: 'errors', value: fromJS(action.payload.errors) }));
  } else if (!action.payload) {
    // set global error here
  }
}

export default function* loginPageSaga() {
  yield takeLatest(types.LOGIN_REQUEST, loginAction);
  yield takeLatest(types.LOGIN_FAILURE, loginFailure);
}
