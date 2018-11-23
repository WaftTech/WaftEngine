import { SET_LATITUDE } from './index';

const changeLatitude = latitude => ({ type: SET_LATITUDE, payload: latitude });

export default changeLatitude;
