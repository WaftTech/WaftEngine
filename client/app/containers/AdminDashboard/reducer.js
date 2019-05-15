/*
 *
 * AdminDashboard reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  users: '',
  errors: '',
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_USER_SUCCESS:
        draft.users = action.payload.totaldata;
        break;
      case types.LOAD_ERROR_SUCCESS:
        draft.errors = action.payload.totaldata;
        break;
    }
  });

export default reducer;
