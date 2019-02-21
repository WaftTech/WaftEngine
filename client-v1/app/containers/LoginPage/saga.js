import { takeLatest, take, call, put, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import * as types from './constants';
import * as actions from './actions';

function* defaultAction(action) {}

export default function* loginPageSaga() {
  yield takeLatest(types.DEFAULT_ACTION, defaultAction);
}
