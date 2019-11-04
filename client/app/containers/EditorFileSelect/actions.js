/*
 *
 * EditorFileSelect actions
 *
 */

import * as types from './constants';

export const loadFilesRequest = payload => ({
  type: types.LOAD_FILES_REQUEST,
  payload,
});
export const loadFilesSuccess = payload => ({
  type: types.LOAD_FILES_SUCCESS,
  payload,
});
export const loadFilesFailure = payload => ({
  type: types.LOAD_FILES_FAILURE,
  payload,
});

export const loadFoldersRequest = payload => ({
  type: types.LOAD_FOLDERS_REQUEST,
  payload,
});
export const loadFoldersSuccess = payload => ({
  type: types.LOAD_FOLDERS_SUCCESS,
  payload,
});
export const loadFoldersFailure = payload => ({
  type: types.LOAD_FOLDERS_FAILURE,
  payload,
});

export const addMediaRequest = (payload, metadata) => ({
  type: types.ADD_MEDIA_REQUEST,
  payload,
  metadata,
});
export const addMediaSuccess = payload => ({
  type: types.ADD_MEDIA_SUCCESS,
  payload,
});
export const addMediaFailure = payload => ({
  type: types.ADD_MEDIA_FAILURE,
  payload,
});

export const loadNewFolderRequest = (payload, metadata) => ({
  type: types.LOAD_NEW_FOLDER_REQUEST,
  payload,
  metadata,
});
export const loadNewFolderSuccess = payload => ({
  type: types.LOAD_NEW_FOLDER_SUCCESS,
  payload,
});
export const loadNewFolderFailure = payload => ({
  type: types.LOAD_NEW_FOLDER_FAILURE,
  payload,
});

export const setFolderName = payload => ({
  type: types.SET_NAME_VALUE,
  payload,
});
