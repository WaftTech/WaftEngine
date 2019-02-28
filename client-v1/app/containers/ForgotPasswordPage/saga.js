import { takeLatest, call, put, select } from 'redux-saga/effects';
// import { push, LOCATION_CHANGE } from 'react-router-redux';
import { fromJS } from 'immutable';
import Api from 'utils/Api';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectEmail } from './selectors';

const validate = data => {
  const errors = {};
  if (!data.email || data.email === '') errors.email = 'email is required';
  return { errors, isValid: !Object.keys(errors).length };
};

function* resetAction() {
  const email = yield select(makeSelectEmail());
  const data = { email };
  const errors = validate(data);
  if (errors.isValid) {
    // const successWatcher = yield fork(redirectOnSuccess);
    yield call(Api.post('user/forgotpassword', actions.passwordResetSuccess, actions.passwordResetFailure, data));
    // yield take(LOCATION_CHANGE, types.PASSWORD_RESET_FAILURE);
    // yield cancel(successWatcher);
  } else {
    yield put(actions.setStoreValue({ key: 'errors', value: fromJS(errors.errors) }));
  }
}

// function* redirectOnSuccess() {
//   yield take(types.PASSWORD_RESET_SUCCESS);
//   yield put(push('/'));
// }

export default function* forgotPasswordPageSaga() {
  yield takeLatest(types.PASSWORD_RESET_REQUEST, resetAction);
}
