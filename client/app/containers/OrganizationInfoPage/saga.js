import {
  takeLatest,
  take,
  call,
  fork,
  put,
  select,
  cancel,
} from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadState() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'static/state',
      actions.loadStateSuccess,
      actions.loadStateFailure,
      token,
    ),
  );
}

function* loadDistrict() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'static/district/0',
      actions.loadDistrictSuccess,
      actions.loadDistrictFailure,
      token,
    ),
  );
}

function* loadVdc() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'static/vdc/0',
      actions.loadVdcSuccess,
      actions.loadVdcFailure,
      token,
    ),
  );
}

function* loadCategories(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'category',
      actions.loadCategoriesSuccess,
      actions.loadCategoriesFailure,
      token,
    ),
  );
}

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get('org', actions.loadAllSuccess, actions.loadAllFailure, token),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `org/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push('/wt/organization-info'));
}

function* addEdit(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const { ProfileImage, ProfileImage1, ...data } = action.payload;
  // const files = {ProfileImage, ProfileImage1};
  const files = [ProfileImage, ProfileImage1];
  yield fork(
    Api.multipartPost(
      'org',
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      files,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_STATE_REQUEST, loadState);
  yield takeLatest(types.LOAD_DISTRICT_REQUEST, loadDistrict);
  yield takeLatest(types.LOAD_VDC_REQUEST, loadVdc);
  yield takeLatest(types.LOAD_CATEGORIES_REQUEST, loadCategories);
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
}
