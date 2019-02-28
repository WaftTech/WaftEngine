import { takeLatest, call, put, select, fork, take, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import Api from 'utils/Api';
import { fromJS } from 'immutable';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectCode, makeSelectEmail, makeSelectPassword } from './selectors';

const validate = data => {
  const errors = {};
  if (!data.email || data.email === '') errors.email = 'email is required!!';
  if (!data.code || data.code === '') errors.code = 'code is required!!';
  if (!data.password || data.password === '') errors.password = 'password is required!!';
  return { errors, isValid: !Object.keys(errors).length };
};

function* submitAction() {
  const email = yield select(makeSelectEmail());
  const code = yield select(makeSelectCode());
  const password = yield select(makeSelectPassword());
  const data = { email, code, password };
  const errors = validate(data);
  if (errors.isValid) {
    const successWatcher = yield fork(redirectOnSuccess);
    yield call(Api.post('user/resetpassword', actions.submitSuccess, actions.submitFailure, data));
    yield take(LOCATION_CHANGE, types.SUBMIT_FAILURE);
    yield cancel(successWatcher);
  } else {
    yield put(actions.setStoreValue({ key: 'errors', value: fromJS(errors.errors) }));
  }
}

function* redirectOnSuccess() {
  yield take(types.SUBMIT_SUCCESS);
  yield put(push('/login'));
}

export default function* codeVerifyPageSaga() {
  yield takeLatest(types.SUBMIT_REQUEST, submitAction);
}
