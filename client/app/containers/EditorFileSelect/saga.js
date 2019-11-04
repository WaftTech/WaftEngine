import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import { makeSelectOne } from './selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadFolders() {
  const token = yield select(makeSelectToken());
  // console.log(token);
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
      `files/file/${action.payload.folder_id}`,
      actions.addMediaSuccess,
      actions.addMediaFailure,
      {},
      { file: action.payload.file },
      token,
    ),
  );
}

function* createNewFolder(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  yield call(
    Api.post(
      `files/folder/${action.payload}`,
      actions.loadNewFolderSuccess,
      actions.loadNewFolderFailure,
      data,
      token,
    ),
  );
}

// Individual exports for testing
export default function* editorFileSelectSaga() {
  yield takeLatest(types.LOAD_FILES_REQUEST, loadFiles);
  yield takeLatest(types.LOAD_FOLDERS_REQUEST, loadFolders);
  yield takeLatest(types.ADD_MEDIA_REQUEST, addMedia);
  yield takeLatest(types.LOAD_NEW_FOLDER_REQUEST, createNewFolder);
}
