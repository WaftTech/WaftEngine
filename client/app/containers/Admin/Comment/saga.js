import {
  take,
  takeLatest,
  call,
  put,
  select,
  fork,
  cancel,
} from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectOne } from './selectors';
import { LOCATION_CHANGE, push } from 'connected-react-router';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload) {
    Object.keys(action.payload).map(each => {
      query = `${query}&${each}=${action.payload[each]}`;
      return null;
    });
  }
  yield call(
    Api.get(
      `comment?${query}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `comment/one/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* getApproved(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'comment/all/approved',
      actions.getApprovedSuccess,
      actions.getApprovedFailure,
      token,
    ),
  );
}

function* getDisapproved(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'comment/all/disapproved',
      actions.getDisapprovedSuccess,
      actions.getDisapprovedFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.LOAD_MANAGE_SUCCESS);
  yield put(push('/admin/blog-comment-manage'));
}

function* loadManage(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    Api.post(
      'comment/approve',
      actions.loadManageSuccess,
      actions.loadManageFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.LOAD_MANAGE_FAILURE]);
  yield cancel(successWatcher);
}

// Individual exports for testing
export default function* blogCommentManagePageSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.LOAD_MANAGE_REQUEST, loadManage);
  yield takeLatest(types.GET_APPROVED_REQUEST, getApproved);
  yield takeLatest(types.GET_DISAPPROVED_REQUEST, getDisapproved);
}
