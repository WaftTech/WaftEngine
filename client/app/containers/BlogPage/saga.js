import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadBlog({ payload }) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/blog/${payload}`,
      actions.loadBlogSuccess,
      actions.loadBlogFailure,
      token,
    ),
  );
}

function* loadRecentBlogs() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/latest`,
      actions.loadRecentBlogsSuccess,
      actions.loadRecentBlogsFailure,
      token,
    ),
  );
}

function* loadRelatedBlogs(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/related/${action.payload}`,
      actions.loadRelatedBlogsSuccess,
      actions.loadRelatedBlogsFailure,
      token,
    ),
  );
}

function* loadBlogByAuthor(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/blogbyauthor/${action.payload}`,
      actions.loadBlogByAuthorSuccess,
      actions.loadBlogByAuthorFailure,
      token,
    ),
  );
}

function* loadBlogByTag(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/blogbytag/${action.payload}`,
      actions.loadBlogByTagSuccess,
      actions.loadBlogByTagFailure,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_BLOG_REQUEST, loadBlog);
  yield takeLatest(types.LOAD_RECENT_BLOGS_REQUEST, loadRecentBlogs);
  yield takeLatest(types.LOAD_RELATED_BLOGS_REQUEST, loadRelatedBlogs);
  yield takeLatest(types.LOAD_BLOG_BY_AUTHOR_REQUEST, loadBlogByAuthor);
  yield takeLatest(types.LOAD_BLOG_BY_TAG_REQUEST, loadBlogByTag);
}
