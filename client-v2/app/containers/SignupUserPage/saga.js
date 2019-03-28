import {
  takeLatest,
  select,
  put,
  fork,
  take,
  cancel,
} from 'redux-saga/effects';
import Api from 'utils/Api';
import { LOCATION_CHANGE, push } from 'connected-react-router';
import * as types from './constants';
import * as actions from './actions';
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectName,
  makeSelectGender,
} from './selectors';
import { setUser, setToken } from '../App/actions';

// Individual exports for testing

export const validate = data => {
  const errors = {};
  if (!data.email) errors.email = 'email is required';
  if (!data.password) errors.password = 'password is required';
  if (!data.gender) errors.gender = 'gender is required';
  if (!data.name) errors.name = 'name is required';
  return { errors, isValid: !Object.keys(errors).length };
};

export function* redirectOnSuccess(redirect) {
  const { payload } = yield take(types.SIGNUP_SUCCESS);
  const { token, data } = payload;
  yield put(setUser(data));
  yield put(setToken(token));
  if (redirect) {
    yield put(push(redirect));
  } else {
    // do something
    yield put(push('/'));
  }
}

export function* signupAction(action) {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const name = yield select(makeSelectName());
  const gender = yield select(makeSelectGender());
  const data = { email, password, password2: password, name, gender };
  const errors = validate(data);
  if (errors.isValid) {
    const successWatcher = yield fork(redirectOnSuccess, action.redirect);
    yield fork(
      Api.post(
        'user/register',
        actions.signupSuccess,
        actions.signupFailure,
        data,
      ),
    );
    yield take([LOCATION_CHANGE, types.SIGNUP_FAILURE]);
    yield cancel(successWatcher);
  } else {
    yield put(actions.setStoreValue({ key: 'errors', value: errors.errors }));
  }
}

export default function* signupUserPageSaga() {
  yield takeLatest(types.SIGNUP_REQUEST, signupAction);
}
