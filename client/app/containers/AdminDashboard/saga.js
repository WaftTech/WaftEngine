import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadUser(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get('user', actions.loadUserSuccess, actions.loadUserFailure, token),
  );
}
function* loadErrors() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get('bug', actions.loadErrorSuccess, actions.loadErrorFailure, token),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_USER_REQUEST, loadUser);
  yield takeLatest(types.LOAD_ERROR_REQUEST, loadErrors);
}
