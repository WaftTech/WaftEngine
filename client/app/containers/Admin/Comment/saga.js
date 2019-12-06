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
import { enqueueSnackbar } from '../../App/actions';
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

function* loadApprove(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.post(
      `comment/approve`,
      actions.approveSuccess,
      actions.approveFailure,
      action.payload,
      token,
    ),
  );
}

function* approveFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while approving!!!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}
function* loadDisapprove(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.post(
      `comment/disapprove`,
      actions.disapproveSuccess,
      actions.disapproveFailure,
      action.payload,
      token,
    ),
  );
}
function* approveSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Approve success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* disapproveSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Disapprove success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* disapproveFailureFunc(action) {
  const snackbarData = {
    message:
      action.payload.msg || 'Something went wrong while disapproving!!!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
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
  yield takeLatest(types.APPROVE_REQUEST, loadApprove);
  yield takeLatest(types.DISAPPROVE_REQUEST, loadDisapprove);
  yield takeLatest(types.DISAPPROVE_FAILURE, disapproveFailureFunc);
  yield takeLatest(types.APPROVE_FAILURE, approveFailureFunc);
  yield takeLatest(types.APPROVE_SUCCESS, approveSuccessFunc);
  yield takeLatest(types.DISAPPROVE_SUCCESS, disapproveSuccessFunc);
}
