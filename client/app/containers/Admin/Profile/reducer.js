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
  twoFactor: {
    email: {
      is_authenticate: false,
    },
    google_authenticate: {
      is_authenticate: false,
    },
  },
  helperObj: { showGoogleTwoFactor: false },
  loading: { loadTwoFactor: false },
};

/* eslint-disable default-case, no-param-reassign */
const userPersonalInformationPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        break;
      case types.SET_VALUE:
        draft[action.payload.name][action.payload.key] = action.payload.value;
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        break;
      case types.CHANGE_PASSWORD_SUCCESS:
        draft.changePassword = initialState;
        break;
      case types.CHANGE_PASSWORD_FAILURE:
        draft.errors = action.payload.errors;
        break;

      case types.LOAD_TWO_FACTOR_REQUEST:
        draft.loading.loadTwoFactor = true;
        break;
      case types.LOAD_TWO_FACTOR_SUCCESS:
        draft.loading.loadTwoFactor = false;
        draft.twoFactor = { ...action.payload.data.multi_fa };
        break;
      case types.LOAD_TWO_FACTOR_FAILURE:
        draft.loading.loadTwoFactor = false;
        break;
      case types.ADD_TWO_FACTOR_SUCCESS:
        // draft.twoFactor = action.payload.data;
        draft.helperObj.showGoogleTwoFactor = false;
        break;
      case types.ADD_GOOGLE_TWO_FACTOR_SUCCESS:
        draft.twoFactor = {
          ...state.twoFactor,
          google_authenticate: {
            email: action.payload.data.email,
            auth_secret_setup:
              action.payload.data.multi_fa.google_authenticate
                .auth_secret_setup,
            setup: action.payload.data.multi_fa.google_authenticate.setup,
          },
        };
        draft.helperObj.showGoogleTwoFactor = true;
        break;
    }
  });

export default userPersonalInformationPageReducer;
