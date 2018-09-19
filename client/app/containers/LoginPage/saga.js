import { take, takeLatest, fork, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import Api from 'utils/Api';
import { setUser, setToken } from 'containers/App/actions';
import * as types from './constants';
import * as actions from './actions';

function* redirectOnSuccess() {
  const { payload } = yield take(types.LOGIN_SUCCESS);
  const { token, data } = payload;
  yield put(setUser(data));
  yield put(setToken(token));
  yield put(push('/home'));
}

function* loginFlow(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    Api.post(
      'user/login',
      actions.loginSuccess,
      actions.loginFailure,
      action.payload,
    ),
  );
  yield take([LOCATION_CHANGE, types.LOGIN_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnResetPasswordSuccess() {
  yield take(types.RESET_PASSWORD_SUCCESS);
  yield put(push('/resetpassword'));
}
function* resetPasswordFlow(action) {
  const successWatcher = yield fork(redirectOnResetPasswordSuccess);
  yield fork(
    Api.post(
      'user/resetpassword',
      actions.resetPasswordSuccess,
      actions.resetPasswordFailure,
      action.payload,
    ),
  );
  yield take([LOCATION_CHANGE, types.RESET_PASSWORD_FAILURE]);
  yield cancel(successWatcher);
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(types.LOGIN_REQUEST, loginFlow);
  yield takeLatest(types.RESET_PASSWORD_REQUEST, resetPasswordFlow);
}
