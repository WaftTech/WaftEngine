import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import Api from 'utils/Api';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectEmail, makeSelectGender, makeSelectConfirmPassword, makeSelectPassword, makeSelectUsername } from './selectors';

const validate = data => {
  const errors = {};
  if (!data.name) errors.username = 'username is required!!';
  if (!data.email) errors.email = 'email is required!!';
  if (!data.password) errors.password = 'password is required';
  if (data.password !== data.confirmPassword) errors.confirmPassword = 'password doesnot match!!';
  return { errors, isValid: !Object.keys(errors).length };
};

function* signupAction() {
  const name = yield select(makeSelectUsername());
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const confirmPassword = yield select(makeSelectConfirmPassword());
  const gender = yield select(makeSelectGender());
  const data = { name, email, password, confirmPassword, gender };
  const errors = validate(data);
  if (errors.isValid) {
    yield put(actions.setStoreValue('loading', true));
    yield call(Api.post('user/register', actions.signupSuccess, actions.signupFailure, data));
    yield put(actions.setStoreValue('loading', false));
  } else {
    yield put(actions.setStoreValue({ key: 'errors', value: fromJS(errors.errors) }));
  }
}
function* signupSuccess(action) {
  if (action.payload && action.payload.success && typeof action.payload.success === 'object') {
    yield put(actions.setStoreValue({ key: 'success', value: fromJS(action.payload.success) }));
  }
}
function* signupFailure(action) {
  if (action.payload && action.payload.errors && typeof action.payload.errors === 'object') {
    yield put(actions.setStoreValue({ key: 'errors', value: fromJS(action.payload.errors) }));
  }
}

export default function* signupPageSaga() {
  yield takeLatest(types.SIGNUP_REQUEST, signupAction);
  yield takeLatest(types.SIGNUP_FAILURE, signupFailure);
  yield takeLatest(types.SIGNUP_SUCCESS, signupSuccess);
}
