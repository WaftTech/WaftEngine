import {
  takeLatest,
  call,
  take,
  fork,
  select,
  put,
  cancel,
} from 'redux-saga/effects';
import Api from 'utils/Api';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import { makeSelectToken } from '../App/selectors';
import { enqueueSnackbar } from '../App/actions';
import * as types from './constants';
import * as actions from './actions';

function* redirectOnSuccess() {
  yield take(types.LOAD_VERIFY_EMAIL_SUCCESS);
  yield put(push('/'));
}

function* verifyEmail(action) {
  const token = yield select(makeSelectToken());
  const successWatcher = yield fork(redirectOnSuccess);
  const data = { email: action.payload.email, code: action.payload.code };
  yield fork(
    Api.post(
      `user/verifymail`,
      actions.loadVerifyEmailSuccess,
      actions.loadVerifyEmailFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.LOAD_VERIFY_EMAIL_FAILURE]);
  yield cancel(successWatcher);
}
function* verifyEmailFailFunc(action) {
  const snackbarData = {
    message:
      (action.payload && action.payload.msg) ||
      'Something went wrong while verifying!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

// Individual exports for testing
export default function* verifyEmailSaga() {
  yield takeLatest(types.LOAD_VERIFY_EMAIL_REQUEST, verifyEmail);
  yield takeLatest(types.LOAD_VERIFY_EMAIL_FAILURE, verifyEmailFailFunc);
}
