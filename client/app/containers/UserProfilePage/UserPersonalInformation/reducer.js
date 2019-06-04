import produce from 'immer';
import * as types from './constants';

export const initialState = {
  one: {
    name: '',
    email: '',
    roles: [],
    avatar: null,
    date_of_birth: '',
    email_verified: false,
  },
  errors: {},
};

/* eslint-disable default-case, no-param-reassign */
const userPersonalInformationPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        break;
    }
  });

export default userPersonalInformationPageReducer;
