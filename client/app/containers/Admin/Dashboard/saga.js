import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadUser(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'user/grby',
      actions.loadUserSuccess,
      actions.loadUserFailure,
      token,
    ),
  );
}
function* loadErrors() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'bug/grby',
      actions.loadErrorSuccess,
      actions.loadErrorFailure,
      token,
    ),
  );
}
function* loadInfo() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get1(
      'documentation/latestinfo',
      actions.loadInfoSuccess,
      actions.loadInfoFailure,
      token,
    ),
  );
}
function* loadBlog() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get1(
      'documentation/latestblog',
      actions.loadBlogSuccess,
      actions.loadBlogFailure,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_USER_REQUEST, loadUser);
  yield takeLatest(types.LOAD_ERROR_REQUEST, loadErrors);
  yield takeLatest(types.LOAD_INFO_REQUEST, loadInfo);
  yield takeLatest(types.LOAD_BLOG_REQUEST, loadBlog);
}
