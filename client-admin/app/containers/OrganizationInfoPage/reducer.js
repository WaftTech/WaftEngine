import { fromJS } from 'immutable';
import { normalize } from 'normalizr';
import state from './staticStates';
import district from './staticDistricts';
import vdc from './staticVdcs';
import * as types from './constants';
import {
  stateSchema,
  districtSchema,
  vdcSchema,
  categoriesSchema,
} from './schemas';

export const initialState = fromJS({
  all: [],
  one: {},
  state,
  district,
  vdc,
  categories: {},
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.DEFAULT_ACTION:
      return state;
    case types.LOAD_CATEGORIES_SUCCESS:
      return state.merge({
        categories: fromJS(
          normalize(action.payload.data || [], [categoriesSchema]).entities
            .categories || {},
        ),
      });
    case types.LOAD_ALL_SUCCESS:
      return state.merge({
        all: fromJS(action.payload.data),
      });
    case types.LOAD_ONE_SUCCESS:
      return state.merge({
        one: fromJS(action.payload.data),
      });
    case types.LOAD_STATE_SUCCESS:
      return state.merge({
        state: fromJS(
          normalize(action.payload.data || [], [stateSchema]).entities.state ||
            {},
        ),
      });
    case types.LOAD_DISTRICT_SUCCESS:
      return state.merge({
        district: fromJS(
          normalize(action.payload.data || [], [districtSchema]).entities
            .district || {},
        ),
      });
    case types.LOAD_VDC_SUCCESS:
      return state.merge({
        vdc: fromJS(
          normalize(action.payload.data || [], [vdcSchema]).entities.vdc || {},
        ),
      });
    default:
      return state;
  }
}

export default reducer;
