import { takeLatest, take, call, fork, put, select, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  yield call(Api.get('user', actions.loadAllSuccess, actions.loadAllFailure, token));
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(Api.get(`user/detail/${action.payload}`, actions.loadOneSuccess, actions.loadOneFailure, token));
}
function* deleteOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `user/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token
    )
  );
}
function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push('/wt/user-manage'));
}
function* addEdit(action) {
  const token = yield select(makeSelectToken());
  const { ProfileImage, ...data } = action.payload;
  const files = { ProfileImage };
  yield call(Api.multipartPost('user', actions.addEditSuccess, actions.addEditFailure, data, files, token));
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteOne);
}
