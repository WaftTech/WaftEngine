import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadFolders(action) {
  const token = yield select(makeSelectToken());
  console.log(token);
  //  yield call(
  //    Api.get(
  //      `someroute/${action.payload}`,
  //      actions.defaultActionSuccess,
  //      actions.defaultActionFailure,
  //      token,
  //    ),
  //  );
}

function* loadFiles(action) {
  const token = yield select(makeSelectToken());
  let query = 'root';
  if (action.payload) {
    query = action.payload;
  }
  yield call(
    Api.get(
      `files/folder/${query}`,
      actions.loadFilesSuccess,
      actions.loadFilesFailure,
      token,
    ),
  );
}

function* addMedia(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.multipartPost(
      `media/multiple/${action.metadata}`,
      actions.addMediaSuccess,
      actions.addMediaFailure,
      {},
      { file: action.payload },
      token,
    ),
  );
}

// Individual exports for testing
export default function* editorFileSelectSaga() {
  yield takeLatest(types.LOAD_FILES_REQUEST, loadFiles);
  yield takeLatest(types.LOAD_FOLDERS_REQUEST, loadFolders);
  yield takeLatest(types.ADD_MEDIA_REQUEST, addMedia);
}
