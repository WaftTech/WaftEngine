/*
 *
 * EditorFileSelect reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    file: {
      data: [],
      totaldata: 0,
    },
    folders: {
      data: [],
      totaldata: 0,
    },
    self: {},
  },
};

/* eslint-disable default-case, no-param-reassign */
const editorFileSelectReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_FILES_SUCCESS:
        draft.all = action.payload.data;
        break;
    }
  });

export default editorFileSelectReducer;
