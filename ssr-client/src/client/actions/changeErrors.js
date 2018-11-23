import { SET_ERRORS } from './index';

const changeErrors = errors => ({ type: SET_ERRORS, payload: errors });

export default changeErrors;
