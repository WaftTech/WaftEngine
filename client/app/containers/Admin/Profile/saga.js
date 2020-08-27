import {
  takeLatest,
  take,
  call,
  fork,
  put,
  select,
  cancel,
} from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import { enqueueSnackbar } from '../../App/actions';
import * as actions from './actions';
import { makeSelectOne, makeSelectTwoFactor } from './selectors';

function* loadOne() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'user/profile',
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  // yield put(push('/user/my-account'));
}

function* addEdit() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  yield fork(
    Api.post(
      'user/profile',
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

function* addEditSuccessful(action) {
  const defaultMsg = {
    message: action.payload.msg || 'User Profile Updated',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* redirectOnSuccessChangePP() {
  yield take(types.CHANGE_PASSWORD_SUCCESS);
  // yield put(logoutRequest());
}

function* changePassword(action) {
  const successWatcher = yield fork(redirectOnSuccessChangePP);

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

function* loadTwoFactor() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'user/2fa',
      actions.loadTwoFactorSuccess,
      actions.loadTwoFactorFailure,
      token,
    ),
  );
}

function* addTwoFactor() {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectTwoFactor());
  yield call(
    Api.post(
      'user/2fa',
      actions.loadTwoFactorSuccess,
      actions.loadTwoFactorFailure,
      data,
      token,
    ),
  );
}
export default function* userPersonalInformationPageSaga() {
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessful);
  yield takeLatest(types.CHANGE_PASSWORD_REQUEST, changePassword);
  yield takeLatest(types.CHANGE_PASSWORD_SUCCESS, addEditSuccessful);
  yield takeLatest(types.LOAD_TWO_FACTOR_REQUEST, loadTwoFactor);
  yield takeLatest(types.ADD_TWO_FACTOR_REQUEST, addTwoFactor);
}
