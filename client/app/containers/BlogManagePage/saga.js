import { takeLatest, take, call, fork, put, select, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadCategory(action) {
  const token = yield select(makeSelectToken());

  yield call(Api.get('blog/category', actions.loadCategorySuccess, actions.loadCategoryFailure, token));
}

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  let search = '';
  let pageNumber = '';
  let sort = '';

  if (action.payload) {
    pageNumber = `&page=${action.payload.page}&size=${action.payload.rowsPerPage}`;
    Object.keys(action.payload).map(each => {
      search = `${each}=${action.payload[each]}${search}`;
    });
  }

  if (action.payload.sort) {
    sort = `&sort=${action.payload.sort}`;
  }
  yield call(Api.get(`blog?find_${search}&page=1&size=10&${sort}${pageNumber}`, actions.loadAllSuccess, actions.loadAllFailure, token));
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(Api.get(`blog/${action.payload}`, actions.loadOneSuccess, actions.loadOneFailure, token));
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push('/wt/blog-manage'));
}

function* addEdit(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const { ...data } = action.payload;
  yield fork(Api.multipartPost('blog', actions.addEditSuccess, actions.addEditFailure, data, { file: data.Image }, token));
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);

  yield takeLatest(types.LOAD_CATEGORY_REQUEST, loadCategory);
}
