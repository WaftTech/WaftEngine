import { takeLatest, take, call, fork, put, select, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  const completionWatcher = yield fork(
    Api.get('role/role', actions.loadAllSuccess, actions.loadAllFailure, token),
  );
  yield take(LOCATION_CHANGE);
  yield cancel(completionWatcher);
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  const completionWatcher = yield fork(
    Api.get(`role/role/${action.payload}`, actions.loadOneSuccess, actions.loadOneFailure, token),
  );
  yield take(LOCATION_CHANGE);
  yield cancel(completionWatcher);
}

function* deleteOne(action) {
  const token = yield select(makeSelectToken());
  const completionWatcher = yield fork(
    Api.delete(
      `role/role/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
  yield take(LOCATION_CHANGE);
  yield cancel(completionWatcher);
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push('/wt/role-manage'));
}

function* addEdit(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const { ...data } = action.payload;
  yield fork(Api.post('role/role', actions.addEditSuccess, actions.addEditFailure, data, token));
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteOne);
}
