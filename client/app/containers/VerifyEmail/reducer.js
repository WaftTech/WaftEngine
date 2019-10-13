/*
 *
 * VerifyEmail reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  one: {},
};

/* eslint-disable default-case, no-param-reassign */
const verifyEmailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_VERIFY_EMAIL_SUCCESS:
        draft.one = initialState.one;
        break;
    }
  });

export default verifyEmailReducer;
