import { takeLatest, take, call, put, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import * as types from './constants';
import * as actions from './actions';

function* loadAboutUs(action) {
  yield call(Api.get(`contents/key/aboutusheader`, actions.loadAboutUsSuccess, actions.loadAboutUsFailure));
}

export default function* aboutUsSaga() {
  yield takeLatest(types.LOAD_ABOUT_US_REQUEST, loadAboutUs);
}
