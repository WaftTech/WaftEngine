import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadBlogList({ action }) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'blog',
      actions.loadBlogListSuccess,
      actions.loadBlogListFailure,
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
  yield takeLatest(types.LOAD_BLOG_LIST_REQUEST, loadBlogList);
  yield takeLatest(types.LOAD_BLOG_BY_AUTHOR_REQUEST, loadBlogByAuthor);
  yield takeLatest(types.LOAD_BLOG_BY_TAG_REQUEST, loadBlogByTag);
}
