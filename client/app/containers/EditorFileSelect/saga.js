import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import {
  makeSelectOne,
  makeSelectChosen,
  makeSelectChosenFolders,
} from './selectors';
import * as types from './constants';
import * as actions from './actions';
import { enqueueSnackbar } from '../App/actions';

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

function* deleteFolder(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `files/folder/${action.payload}`,
      actions.folderDeleteSuccess,
      actions.folderDeleteFailure,
      token,
    ),
  );
}

function* deleteFile(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `files/file/${action.payload}`,
      actions.fileDeleteSuccess,
      actions.fileDeleteFailure,
      token,
    ),
  );
}

function* createNewFolder(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  let datas = { ...data };
  let successCall = actions.loadNewFolderSuccess;
  if (action.payload.value && action.payload.name) {
    datas._id = action.payload.value;
    datas.name = action.payload.name;
    successCall = actions.renameFolderSuccess;
  }
  console.log(datas, 'datas');
  yield call(
    Api.post(
      `files/folder/${action.payload.key}`,
      successCall,
      actions.loadNewFolderFailure,
      datas,
      token,
    ),
  );
}

function* multipleDelete(action) {
  const token = yield select(makeSelectToken());
  const files = yield select(makeSelectChosen());
  const folders = yield select(makeSelectChosenFolders());

  const data = {
    folder_id: [...folders],
    file_id: [...files],
  };

  console.log('delete DATA', data);
  yield call(
    Api.post(
      `media/deleteall`,
      actions.deleteMultipleSuccess,
      actions.deleteMultipleFailure,
      data,
      token,
    ),
  );
}

function* multiDeleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Delete success',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* multiDeleteFailureFunc(action) {
  const snackbarData = {
    message: 'Something went wrong while deleting!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

// Individual exports for testing
export default function* editorFileSelectSaga() {
  yield takeLatest(types.LOAD_FILES_REQUEST, loadFiles);
  yield takeLatest(types.LOAD_FOLDERS_REQUEST, loadFolders);
  yield takeLatest(types.DELETE_FOLDER_REQUEST, deleteFolder);
  yield takeLatest(types.DELETE_FILE_REQUEST, deleteFile);
  yield takeLatest(types.ADD_MEDIA_REQUEST, addMedia);
  yield takeLatest(types.LOAD_NEW_FOLDER_REQUEST, createNewFolder);
  yield takeLatest(types.DELETE_MULTIPLE_REQUEST, multipleDelete);
  yield takeLatest(types.DELETE_MULTIPLE_SUCCESS, multiDeleteSuccessFunc);
  yield takeLatest(types.DELETE_MULTIPLE_REQUEST, multiDeleteFailureFunc);
}
