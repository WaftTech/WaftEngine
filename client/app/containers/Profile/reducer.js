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
  changePassword: '',
  errors: {},
  loading: false,
  email_verified: false,
  verification_code: '',
};

/* eslint-disable default-case, no-param-reassign */
const userPersonalInformationPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        break;
      case types.SET_CODE_VALUE:
        draft.verification_code = action.payload.value;
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = action.payload.data;
        draft.email_verified = action.payload.data.email_verified;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.CHANGE_PASSWORD_SUCCESS:
        draft.changePassword = initialState;
        break;
      case types.CHANGE_PASSWORD_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.VERIFY_EMAIL_SUCCESS:
        draft.verification_code = initialState.verification_code;
        break;
      case types.VERIFY_EMAIL_FAILURE:
        draft.verification_code = initialState.verification_code;
        break;
    }
  });

export default userPersonalInformationPageReducer;
