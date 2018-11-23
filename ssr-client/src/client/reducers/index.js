import { combineReducers } from 'redux';
import grocersReducer from './grocersReducer';
import latitudeReducer from './latitudeReducer';
import longitudeReducer from './longitudeReducer';
import distanceReducer from './distanceReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
  grocers: grocersReducer,
  latitude: latitudeReducer,
  longitude: longitudeReducer,
  distance: distanceReducer,
  errors: errorsReducer,
});
