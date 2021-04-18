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

import * as types from './constants';
import * as actions from './actions';
import { makeSelectToken } from '../../App/selectors';
import Api from '../../../utils/Api';
import { enqueueSnackbar } from '../../App/actions';
import { makeSelectOne } from './selectors';

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
      `social?${query}`,
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
      `social/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push('/admin/social-media'));
}

function* addEdit() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  console.log('data', data);
  // const finalData = { ...data, group_id: data.group_id || data.group_id._id };
  // console.log('final data', finalData);

  //let finalData = { ...data };

  // if (data.image !== '') {
  //   finalData = { ...finalData, image: data.image._id };
  // }

  yield fork(
    Api.post(
      'social',
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

function* addEditFailureFunc(action) {
  const snackbarData = {
    message: action.payload.errors.titleOrOrder || 'Something went wrong',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* addEditSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update Success!!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteSocialMedia(action) {
  const token = yield select(makeSelectToken());
  console.log('payload: ', action.payload);

  yield call(
    Api.delete(
      `social/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
}

function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Social Media delete success!!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

export default function* attributeSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteSocialMedia);
  yield takeLatest(types.DELETE_ONE_FAILURE, deleteFailureFunc);
  yield takeLatest(types.DELETE_ONE_SUCCESS, deleteSuccessFunc);
}
