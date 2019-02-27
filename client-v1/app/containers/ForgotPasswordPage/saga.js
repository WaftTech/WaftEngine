import { takeLatest, call, put, select } from 'redux-saga/effects';
import fromJS from 'immutable';
import Api from 'utils/Api';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectEmail } from './selectors';

const validate = data => {
  const errors = {};
  if (!data.email) errors.email = 'email is required';
  return { errors, isValid: !Object.keys(errors).length };
};

function* resetAction() {
  const email = yield select(makeSelectEmail());
  console.log(email);
  const data = { email };
  const errors = validate(data);
  if (errors.isValid) {
    yield call(Api.post('user/forgotpassword', actions.passwordResetSuccess, actions.passwordResetFailure, data));
  } else {
    yield put(actions.setStoreValue({ key: 'errors', value: fromJS(errors.errors) }));
  }
}

// function* resetFailure(action) {
//   if (action.payload && action.payload.errors && typeof action.payload.errors === 'object') {
//     yield put(actions.setStoreValue({ key: 'errors', value: fromJS(action.payload.errors) }));
//   } else if (!action.payload) {
//     // set global error here
//   }
// }

export default function* forgotPasswordPageSaga() {
  yield takeLatest(types.PASSWORD_RESET_REQUEST, resetAction);
}
