import { takeLatest, call, select } from 'redux-saga/effects';

import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadError(action) {
  const token = yield select(makeSelectToken());
  let pageNumber = '';
  if (action.payload) {
    pageNumber = `&page=${action.payload.page}&size=${action.payload.rowsPerPage}`;
  }
  yield call(
    Api.get(`bugs?${pageNumber}`, actions.loadErrorSuccess, actions.loadErrorFailure, token),
  );
}
// function* deleteOne(action) {
//   const token = yield select(makeSelectToken());
//   yield call(
//     Api.delete(`bugs/${action.payload}`, actions.deleteOneSuccess, actions.deleteOneFailure, token),
//   );
// }

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ERROR_REQUEST, loadError);
  // yield takeLatest(types.DELETE_ONE_REQUEST, deleteOne);
}
