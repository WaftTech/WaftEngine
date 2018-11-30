/*
 *
 * RoleManagePage actions
 *
 */

import * as types from './constants';

export const loadAllRequest = payload => ({
  type: types.LOAD_ALL_REQUEST,
  payload,
});
export const loadAllSuccess = payload => ({
  type: types.LOAD_ALL_SUCCESS,
  payload,
});
export const loadAllFailure = payload => ({
  type: types.LOAD_ALL_FAILURE,
  payload,
});

export const loadOneRequest = payload => ({
  type: types.LOAD_ONE_REQUEST,
  payload,
});
export const loadOneSuccess = payload => ({
  type: types.LOAD_ONE_SUCCESS,
  payload,
});
export const loadOneFailure = payload => ({
  type: types.LOAD_ONE_FAILURE,
  payload,
});

export const addEditRequest = payload => ({
  type: types.ADD_EDIT_REQUEST,
  payload,
});
export const addEditSuccess = payload => ({
  type: types.ADD_EDIT_SUCCESS,
  payload,
});
export const addEditFailure = payload => ({
  type: types.ADD_EDIT_FAILURE,
  payload,
});

export const deleteOneRequest = payload => ({
  type: types.DELETE_ONE_REQUEST,
  payload,
});
export const deleteOneSuccess = payload => ({
  type: types.DELETE_ONE_SUCCESS,
  payload,
});
export const deleteOneFailure = payload => ({
  type: types.DELETE_ONE_FAILURE,
  payload,
});

export const AccessTypeChange = payload => ({ type: types.ACCESS_TYPE_CHANGE, payload });
export const AdminRoutesChange = payload => ({ type: types.ADMIN_ROUTE_CHANGE, payload });
export const RemoveAdminRoute = payload => ({ type: types.REMOVE_ADMIN_ROUTE, payload });
export const AddAdminRoute = payload => ({ type: types.ADD_ADMIN_ROUTE, payload });
export const ServerRoutesMethodChange = payload => ({
  type: types.SERVER_ROUTES_METHOD_CHANGE,
  payload,
});
export const ServerRoutesRouteChange = payload => ({
  type: types.SERVER_ROUTES_ROUTE_CHANGE,
  payload,
});
export const RemoveServerRoute = payload => ({ type: types.REMOVE_SERVER_ROUTE, payload });
export const AddServerRoute = payload => ({ type: types.ADD_SERVER_ROUTE, payload });
export const RemovePath = payload => ({ type: types.REMOVE_PATH, payload });
