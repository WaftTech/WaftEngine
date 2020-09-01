import {
  takeLatest,
  select,
  put,
  fork,
  take,
  cancel,
  call,
} from 'redux-saga/effects';
import Api from 'utils/Api';
import { LOCATION_CHANGE, push } from 'connected-react-router';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectEmail, makeSelectPassword } from './selectors';
import { setUser, setToken } from '../App/actions';
import { enqueueSnackbar } from '../App/actions';

// Individual exports for testing
export const validate = data => {
  const errors = {};
  if (!data.email) errors.email = 'email is required';
  if (!data.password) errors.password = 'password is required';
  return { errors, isValid: !Object.keys(errors).length };
};

export function* redirectOnSuccess(redirect) {
  const { payload } = yield take([
    types.LOGIN_SUCCESS,
    types.LOGIN_WITH_FB_SUCCESS,
    types.LOGIN_WITH_GOOGLE_SUCCESS,
  ]);
  const { token, data } = payload;
  yield put(setUser(data));
  yield put(setToken(token));
  if (redirect) {
    yield put(push(redirect));
  } else {
    yield put(push('/'));
  }
}

export function* loginAction(action) {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const data = { email, password };
  const errors = validate(data);
  if (errors.isValid) {
    const successWatcher = yield fork(redirectOnSuccess, action.redirect);
    yield fork(
      Api.post('user/login', actions.loginSuccess, actions.loginFailure, data),
    );
    yield take([LOCATION_CHANGE, types.LOGIN_FAILURE]);
    yield cancel(successWatcher);
  } else {
    yield put(actions.setStoreValue({ key: 'errors', value: errors.errors }));
    yield put(actions.setStoreValue({ key: 'loading', value: false }));
  }
}

export function* loginFbAction(action) {
  const body = { access_token: action.payload.accessToken };
  const successWatcher = yield fork(redirectOnSuccess, action.redirect);

  yield fork(
    Api.post(
      `user/login/facebook`,
      actions.loginWithFbSuccess,
      actions.loginWithFbFailure,
      body,
    ),
  );
  yield take([LOCATION_CHANGE, types.LOGIN_WITH_FB_FAILURE]);
  yield cancel(successWatcher);
}

export function* loginGoogleAction(action) {
  const body = { access_token: action.payload.accessToken };
  const successWatcher = yield fork(redirectOnSuccess, action.redirect);

  yield fork(
    Api.post(
      `user/login/google`,
      actions.loginWithGoogleSuccess,
      actions.loginWithGoogleFailure,
      body,
    ),
  );
  yield take([LOCATION_CHANGE, types.LOGIN_WITH_GOOGLE_FAILURE]);
  yield cancel(successWatcher);
}

function* loginFailureFunc(action) {
  if (action.payload.data.email_verified === false) {
    yield put(push(`/verify/${action.payload.data.email}`));
  }
  const snackbarData = {
    message: action.payload.msg || 'Error while login!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* loginSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'login success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

export default function* loginAdminPageSaga() {
  yield takeLatest(types.LOGIN_REQUEST, loginAction);
  yield takeLatest(types.LOGIN_WITH_FB_REQUEST, loginFbAction);
  yield takeLatest(types.LOGIN_WITH_GOOGLE_REQUEST, loginGoogleAction);
  yield takeLatest(types.LOGIN_FAILURE, loginFailureFunc);
  yield takeLatest(types.LOGIN_SUCCESS, loginSuccessFunc);
}
