import { delay } from 'redux-saga';
import { takeLatest, fork, put, cancel, take, select, call, takeEvery } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* subscribe(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.post(
      'subscribe',
      actions.subscribeSuccess,
      actions.subscribeFailure,
      action.payload,
      token,
    ),
  );
  yield call(delay, 5000);
  yield put(actions.clearMessages());
}

function* loadContent(action) {
  yield call(
    Api.get(
      `contents/key/${action.payload}`,
      actions.loadContentSuccess,
      actions.loadContentFailure,
    ),
  );
}
function* loadMedia(action) {
  yield call(
    Api.get(`media/_id/${action.payload}`, actions.loadMediaSuccess, actions.loadMediaFailure),
  );
}
function* postMedia(action) {
  yield fork(
    Api.multipartPost(
      `media/_id/${action.payload}`,
      actions.postMediaSuccess,
      actions.postMediaFailure,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.SUBSCRIBE_REQUEST, subscribe);
  yield takeEvery(types.LOAD_CONTENT_REQUEST, loadContent);
  yield takeEvery(types.LOAD_MEDIA_REQUEST, loadMedia);
  yield takeEvery(types.POST_MEDIA_REQUEST, postMedia);
}
