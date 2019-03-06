import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  isRequesting: false,
  success: false,
  successMessage: '',
  errorMessage: '',
  contactDetail: {},
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_CONTACT_REQUEST:
      return state.merge({
        isRequesting: true,
        success: false,
        successMessage: '',
        errorMessage: '',
      });
    case types.SAVE_CONTACT_SUCCESS:
      return state.merge({
        isRequesting: false,
        success: true,
        successMessage: action.payload.msg,
      });
    case types.SAVE_CONTACT_FAILURE:
      return state.merge({
        isRequesting: false,
        success: false,
        errorMessage:
          typeof action.payload.errors === 'string'
            ? action.payload.errors
            : 'something went wrong',
      });
    case types.CLEAR_MESSAGES:
      return state.merge({
        successMessage: '',
        errorMessage: '',
      });
    case types.CONTACT_DETAIL_SUCCESS:
      return state.merge({
        contactDetail: fromJS(action.payload.data),
      });
    default:
      return state;
  }
}

export default reducer;
