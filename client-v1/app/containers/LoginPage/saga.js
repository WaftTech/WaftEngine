import { takeLatest, take, call, put, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectUsername, makeSelectPassword } from './selectors';

function* loginAction() {
  const email = yield select(makeSelectUsername());
  const password = yield select(makeSelectPassword());
  yield call(Api.post('user/login', { email, password }, actions.loginSuccess, actions.loginFailure));
}

export default function* loginPageSaga() {
  yield takeLatest(types.LOGIN_REQUEST, loginAction);
}
