import { SET_DISTANCE } from '../actions';

const distanceReducer = (state = '32186', action = {}) =>
  action.type === SET_DISTANCE ? action.payload : state;

export default distanceReducer;
