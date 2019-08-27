import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import { makeSelectOne } from './selectors';
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

function* loadComment(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/comment/${action.payload}`,
      actions.loadCommentSuccess,
      actions.loadCommentFailure,
      token,
    ),
  );
}

function* postComment(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  data.blog_id = action.payload;
  yield call(
    Api.post(
      'blog/comment',
      actions.postCommentSuccess,
      actions.postCommentFailure,
      data,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_BLOG_REQUEST, loadBlog);
  yield takeLatest(types.LOAD_RECENT_BLOGS_REQUEST, loadRecentBlogs);
  yield takeLatest(types.LOAD_RELATED_BLOGS_REQUEST, loadRelatedBlogs);
  yield takeLatest(types.LOAD_COMMENT_REQUEST, loadComment);
  yield takeLatest(types.POST_COMMENT_REQUEST, postComment);
}
