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
import { makeSelectOne, makeSelectSliderSetting } from './selectors';

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
      `testimonial?${query}`,
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
      `testimonial/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push('/admin/testimonial-manage'));
}

function* addEdit() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  console.log('data', data);
  // const finalData = { ...data, group_id: data.group_id || data.group_id._id };
  // console.log('final data', finalData);
  let finalData = { ...data };

  if (data.image !== '') {
    finalData = { ...finalData, image: data.image._id };
  }

  yield fork(
    Api.post(
      'testimonial',
      actions.addEditSuccess,
      actions.addEditFailure,
      finalData,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

function* addEditFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong',
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

function* deleteTestimonial(action) {
  const token = yield select(makeSelectToken());

  yield call(
    Api.delete(
      `testimonial/delete/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
}

function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Testimonial delete success!!!',
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
function* saveTestimonialSetting() {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectSliderSetting())
  debugger
  yield call(
    Api.post(
      `testimonial/settings/save`,
      actions.sliderSettingSuccess,
      actions.sliderSettingFailure,
      data,
      token
    ),
  );
}
function* onTestimonialRequestSuccess(action) {
  const snackbarData = {
    message: action.payload.msg || 'Testimonial Setting Saved!!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  yield put(actions.closePopUp());
  console.log("close pop up")
}
function* loadTestimonialSetting(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `testimonial/settings/get`,
      actions.loadSliderSettingSuccess,
      actions.loadSliderSettingFailure,
      token
    ),
  );
}

export default function* attributeSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteTestimonial);
  yield takeLatest(types.DELETE_ONE_FAILURE, deleteFailureFunc);
  yield takeLatest(types.DELETE_ONE_SUCCESS, deleteSuccessFunc);
  yield takeLatest(types.SLIDER_SETTING_REQUEST, saveTestimonialSetting);
  yield takeLatest(types.SLIDER_SETTING_SUCCESS, onTestimonialRequestSuccess);
  yield takeLatest(types.LOAD_SLIDER_SETTING_REQUEST, loadTestimonialSetting);



}
