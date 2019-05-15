import {
  takeLatest,
  select,
  fork,
  take,
  put,
  cancel,
} from 'redux-saga/effects';
import Api from 'utils/Api';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { logoutRequest } from '../../App/actions';

function* redirectOnSuccess() {
  yield take(types.CHANGE_PASSWORD_SUCCESS);
  yield put(logoutRequest());
  yield put(push('/login-user'));
}

function* changePassword(action) {
  const successWatcher = yield fork(redirectOnSuccess);

  const token = yield select(makeSelectToken());
  yield fork(
    Api.post(
      'user/changepassword',
      actions.changePasswordSuccess,
      actions.changePasswordFailure,
      action.payload,
      token,
    ),
  );

  yield take([LOCATION_CHANGE, types.CHANGE_PASSWORD_FAILURE]);
  yield cancel(successWatcher);
}

export default function* changePasswordPageSaga() {
  yield takeLatest(types.CHANGE_PASSWORD_REQUEST, changePassword);
}
