import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadBlog({ payload }) {
  const token = yield select(makeSelectToken());
  yield call(Api.get(`blog/${payload}`, actions.loadBlogSuccess, actions.loadBlogFailure, token));
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_BLOG_REQUEST, loadBlog);
}
