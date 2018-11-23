import { FETCH_GROCERS } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_GROCERS:
      return action.payload.data.POI || [];
    default:
      return state;
  }
};
