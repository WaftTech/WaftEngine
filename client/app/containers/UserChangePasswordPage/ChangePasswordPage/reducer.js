import produce from 'immer';
import * as types from './constants';

export const initialState = {
  changePassword: '',
};

/* eslint-disable default-case, no-param-reassign, no-unused-vars */
const changePasswordPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CHANGE_PASSWORD_SUCCESS:
        draft.changePassword = initialState;
        break;
    }
  });

export default changePasswordPageReducer;
