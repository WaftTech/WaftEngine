/*
 *
 * OrganizationDetailPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';
import { LOAD_ORG_SUCCESS } from './constants';

export const initialState = fromJS({});

function organizationDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_ORG_SUCCESS:
      return state;
    default:
      return state;
  }
}

export default organizationDetailPageReducer;
