import { SET_ERRORS } from '../actions';

const errorsReducer = (state = '', action = {}) =>
  action.type === SET_ERRORS ? action.payload : state;

export default errorsReducer;
