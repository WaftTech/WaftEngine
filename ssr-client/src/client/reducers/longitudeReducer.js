import { SET_LONGITUDE } from '../actions';

const longitudeReducer = (state = '', action = {}) =>
  action.type === SET_LONGITUDE ? action.payload : state;

export default longitudeReducer;
