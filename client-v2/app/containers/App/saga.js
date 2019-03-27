import { call, takeEvery, takeLatest, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectToken } from './selectors';

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
    Api.get(
      `media/${action.payload}`,
      actions.loadMediaSuccess,
      actions.loadMediaFailure,
    ),
  );
}
function* logOut() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(`user/logout`, actions.logoutSuccess, actions.logoutFailure, token),
  );
}

export default function* defaultSaga() {
  yield takeEvery(types.LOAD_CONTENT_REQUEST, loadContent);
  yield takeEvery(types.LOAD_MEDIA_REQUEST, loadMedia);
  yield takeLatest(types.LOGOUT_REQUEST, logOut);
}
