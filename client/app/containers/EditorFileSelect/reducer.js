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
  folderRename: false,
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const editorFileSelectReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_FILES_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_FILES_SUCCESS:
        draft.loading = false;
        draft.all = action.payload.data;
        break;
      case types.LOAD_FILES_FAILURE:
        draft.loading = false;
        break;
      case types.SET_NAME_VALUE:
        draft.folderOne[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_VALUE:
        draft.folderOne.name = initialState.folderOne.name;
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
      case types.RENAME_FOLDER_REQUEST:
        draft.folderRename = true;
        break;
      case types.RENAME_FOLDER_SUCCESS:
        draft.folderRename = false;
        draft.all.folders.data = state.all.folders.data.map(each => {
          if (each._id === action.payload.data._id) {
            return action.payload.data;
          } else {
            return each;
          }
        });
        break;
      case types.RENAME_FOLDER_FAILURE:
        draft.folderRename = false;
        break;
      case types.LOAD_NEW_FOLDER_FAILURE:
        draft.folderAddRequest = false;
        break;
      case types.ADD_MEDIA_SUCCESS:
        action.payload.data.map(each => {
          draft.all.files.data = [...state.all.files.data, each];
        });
        draft.all.files.totaldata = state.all.files.totaldata + 1;
        break;
      case types.DELETE_FOLDER_SUCCESS:
        draft.all.folders = {
          ...state.all.folders,
          data: state.all.folders.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
        draft.all.folders.totaldata = state.all.folders.totaldata - 1;
        break;
      case types.DELETE_FILE_SUCCESS:
        draft.all.files = {
          ...state.all.files,
          data: state.all.files.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
        draft.all.files.totaldata = state.all.files.totaldata - 1;
        break;
    }
  });

export default editorFileSelectReducer;
