import produce from 'immer';
import * as types from './constants';

export const initialState = {
  isRequesting: false,
  success: false,
  successMessage: '',
  errorMessage: '',
  contactDetail: {},
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SAVE_CONTACT_REQUEST:
        draft.isRequesting = true;
        draft.success = false;
        draft.successMessage = '';
        draft.errorMessage = '';
      case types.SAVE_CONTACT_SUCCESS:
        draft.isRequesting = false;
        draft.success = true;
        draft.successMessage = action.payload.msg;
      case types.SAVE_CONTACT_FAILURE:
        draft.isRequesting = false;
        draft.success = false;
        draft.errorMessage =
          typeof action.payload.errors === 'string'
            ? action.payload.errors
            : 'something went wrong';
      case types.CLEAR_MESSAGES:
        draft.successMessage = '';
        draft.errorMessage = '';
      case types.CONTACT_DETAIL_SUCCESS:
        draft.contactDetail = action.payload.data;
    }
  });

export default reducer;
