import {
  take,
  takeLatest,
  call,
  put,
  select,
  fork,
  cancel,
} from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload) {
    Object.keys(action.payload).map(each => {
      query = `${query}&${each}=${action.payload[each]}`;
      return null;
    });
  }
  yield call(
    Api.get(
      `blog/comment?${query}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

// Individual exports for testing
export default function* blogCommentManagePageSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
}
