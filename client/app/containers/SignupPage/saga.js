import { takeLatest, fork, take, cancel, put } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import Api from 'utils/Api';
import { setToken, setUser } from '../App/actions';
import * as types from './constants';
import * as actions from './actions';

function* onSuccess() {
  const { payload } = yield take(types.SIGNUP_SUCCESS);
  const { token, data } = payload;
  localStorage.setItem('token', token);
  yield put(setUser(data));
  yield put(setToken(token));
  yield put(push('/home'));
}

function* signup(action) {
  const successWatcher = yield fork(onSuccess);
  yield fork(
    Api.post(
      'user/register',
      actions.signupSuccess,
      actions.signupFailure,
      action.payload,
    ),
  );
  yield take(LOCATION_CHANGE, types.SIGNUP_FAILURE);
  yield cancel(successWatcher);
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(types.SIGNUP_REQUEST, signup);
}
