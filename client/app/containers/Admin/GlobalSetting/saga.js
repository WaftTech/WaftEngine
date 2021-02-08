import {
  takeLatest,
  cancel,
  take,
  call,
  put,
  fork,
  select,
} from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { enqueueSnackbar } from '../../App/actions';
import { makeSelectOne } from './selectors';

function* loadWithdraw(action) {
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
      `setting/all?${query}`,
      actions.loadWithdrawSuccess,
      actions.loadWithdrawFailure,
      token,
    ),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `setting/single/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.SAVE_SUCCESS);
  yield put(push('/admin/global-setting'));
}

function* save() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  const type = data.type;

  yield fork(
    Api.post(
      `setting/${type}`,
      actions.saveSuccess,
      actions.saveFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.SAVE_FAILURE]);
  yield cancel(successWatcher);
}

function* saveFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* saveSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update Success!!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteOne(action) {
  const token = yield select(makeSelectToken());

  yield call(
    Api.delete(
      `setting/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
}

function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'training/training-main delete success!!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteFailureFunc(action) {
  const snackbarData = {
    message:
      action.payload && action.payload.msg
        ? action.payload.msg
        : 'Something went wrong',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

// Individual exports for testing
export default function* globalSettingSaga() {
  yield takeLatest(types.LOAD_WITHDRAW_REQUEST, loadWithdraw);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.SAVE_REQUEST, save);
  yield takeLatest(types.SAVE_SUCCESS, saveSuccessFunc);
  yield takeLatest(types.SAVE_FAILURE, saveFailureFunc);
}
