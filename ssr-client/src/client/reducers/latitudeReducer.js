import { SET_LATITUDE } from '../actions';

const latitudeReducer = (state = '', action = {}) =>
  action.type === SET_LATITUDE ? action.payload : state;

export default latitudeReducer;
