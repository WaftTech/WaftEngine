import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadVideoLibraryList({ action }) {
  const token = yield select(makeSelectToken());
  yield call(Api.get('video', actions.loadVideoLibraryListSuccess, actions.loadVideoLibraryListFailure, token));
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_VIDEOLIBRARY_LIST_REQUEST, loadVideoLibraryList);
}
