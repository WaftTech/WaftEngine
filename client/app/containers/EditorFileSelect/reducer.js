/*
 *
 * EditorFileSelect reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  files: [],
  folders: ['blog', 'media'],
  currentFolder: 'media',
};

/* eslint-disable default-case, no-param-reassign */
const editorFileSelectReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_FILES_REQUEST:
        break;
      case types.LOAD_FILES_SUCCESS:
        draft.files = action.payload.data;
        break;
      case types.LOAD_FILES_FAILURE:
        break;
    }
  });

export default editorFileSelectReducer;
