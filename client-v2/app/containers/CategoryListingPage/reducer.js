import produce from 'immer';
import * as types from './constants';

export const initialState = {
  category: [],
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_CATEGORY_SUCCESS:
        draft.category = action.payload.data;
    }
  });

export default reducer;
