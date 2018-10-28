/*
 *
 * OrganizationDetailPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  organization: {
    category: {},
    organization: {},
  },
});

function organizationDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_ORG_SUCCESS:
      return state.merge({
        organization: fromJS(action.payload.data),
      });
    default:
      return state;
  }
}

export default organizationDetailPageReducer;
