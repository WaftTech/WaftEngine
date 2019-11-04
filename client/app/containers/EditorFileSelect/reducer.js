/*
 *
 * EditorFileSelect reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    files: {
      data: [],
      totaldata: 0,
    },
    folders: {
      data: [],
      totaldata: 0,
    },
    self: {
      name: 'Root',
      path: [],
    },
  },
  folderOne: {
    name: '',
    is_root: false,
  },
  folderAddRequest: false,
};

/* eslint-disable default-case, no-param-reassign */
const editorFileSelectReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_FILES_SUCCESS:
        draft.all = action.payload.data;
        break;
      case types.SET_NAME_VALUE:
        draft.folderOne[action.payload.key] = action.payload.value;
        break;
      case types.LOAD_NEW_FOLDER_REQUEST:
        draft.folderAddRequest = true;
        break;
      case types.LOAD_NEW_FOLDER_SUCCESS:
        draft.folderAddRequest = false;
        draft.all.folders.data = [
          ...state.all.folders.data,
          { name: action.payload.data.name, _id: action.payload.data._id },
        ];
        draft.all.folders.totaldata = state.all.folders.totaldata + 1;
        break;
      case types.LOAD_NEW_FOLDER_FAILURE:
        draft.folderAddRequest = false;
        break;
    }
  });

export default editorFileSelectReducer;
