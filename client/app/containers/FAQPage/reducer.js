import produce from 'immer';
import * as types from './constants';

export const initialState = {
  faq: {},
};

const faqPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_FAQ_SUCCESS:
        draft.faq = action.payload.data;
        break;
    }
  });

export default faqPageReducer;
