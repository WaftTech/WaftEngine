import { SET_LONGITUDE } from './index';

const changeLongitude = longitude => ({ type: SET_LONGITUDE, payload: longitude });

export default changeLongitude;
