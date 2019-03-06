import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadVideoDetail({ payload }) {
  const token = yield select(makeSelectToken());
  yield call(Api.get(`video/link/${payload}`, actions.loadVideoDetailSuccess, actions.loadVideoDetailFailure, token));
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_VIDEODETAIL_REQUEST, loadVideoDetail);
}
