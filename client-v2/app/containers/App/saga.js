import { call, takeEvery } from 'redux-saga/effects';
import Api from 'utils/Api';
import * as types from './constants';
import * as actions from './actions';

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
      `media/_id/${action.payload}`,
      actions.loadMediaSuccess,
      actions.loadMediaFailure,
    ),
  );
}

export default function* defaultSaga() {
  yield takeEvery(types.LOAD_CONTENT_REQUEST, loadContent);
  yield takeEvery(types.LOAD_MEDIA_REQUEST, loadMedia);
}
