import { takeLatest, fork, take, cancel, put } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import Api from 'utils/Api';
import * as types from './constants';
import * as actions from './actions';

function* onSuccess() {
  const { payload } = yield take(types.FIND_USER_SUCCESS);
  yield put(push(`/login/${payload.data.email}`));
}
function* onFailure() {
  const { payload } = yield take(types.FIND_USER_FAILURE);
  console.log(payload);
  if (!payload.errors) {
    yield put(push(`/register/${payload.data.email}`));
  }
}

function* findUser(action) {
  const successWatcher = yield fork(onSuccess);
  const failureWatcher = yield fork(onFailure);
  yield fork(
    Api.post(
      'user',
      actions.findUserSuccess,
      actions.findUserFailure,
      action.payload,
    ),
  );
  yield take(LOCATION_CHANGE);
  yield cancel(successWatcher);
  yield cancel(failureWatcher);
}

export default function* defaultSaga() {
  yield takeLatest(types.FIND_USER_REQUEST, findUser);
}
