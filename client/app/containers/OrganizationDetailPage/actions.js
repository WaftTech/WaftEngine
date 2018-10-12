/*
 *
 * OrganizationDetailPage actions
 *
 */
import * as types from './constants';

export const loadOrgRequest = payload => ({
  type: types.LOAD_ORG_REQUEST,
  payload,
});
export const loadOrgSuccess = payload => ({
  type: types.LOAD_ORG_SUCCESS,
  payload,
});
export const loadOrgFailure = payload => ({
  type: types.LOAD_ORG_FAILURE,
  payload,
});
