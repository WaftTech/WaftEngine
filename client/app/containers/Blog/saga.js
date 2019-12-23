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

function* loadArchives(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog/blogbytime`,
      actions.loadArchivesSuccess,
      actions.loadArchivesFailure,
      token,
    ),
  );
}

function* loadBlogList(action) {
  let query = '';
  if (action.payload) {
    Object.keys(action.payload).map(each => {
      query = `${query}&${each}=${action.payload[each]}`;
    });
  }
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `blog?${query}`,
      actions.loadBlogListSuccess,
      actions.loadBlogListFailure,
      token,
    ),
  );
}

function* loadBlogByAuthor(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map(each => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `blog/blogbyauthor/${action.payload.key}?${query}`,
      actions.loadBlogByAuthorSuccess,
      actions.loadBlogByAuthorFailure,
      token,
    ),
  );
}

function* loadBlogByTag(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map(each => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `blog/blogbytag/${action.payload.key}?${query}`,
      actions.loadBlogByTagSuccess,
      actions.loadBlogByTagFailure,
      token,
    ),
  );
}

function* loadBlogDate(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map(each => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `blog/blogbytime/${action.payload.key}?${query}`,
      actions.loadBlogDateSuccess,
      actions.loadBlogDateFailure,
      token,
    ),
  );
}
function* loadCategory() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'blog/category?is_active=true',
      actions.loadCategorySuccess,
      actions.loadCategoryFailure,
      token,
    ),
  );
}
function* loadBlogOfCat(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map(each => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `blog/blogbycat/${action.payload.key}?${query}`,
      actions.loadBlogOfCatSuccess,
      actions.loadBlogOfCatFailure,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_BLOG_REQUEST, loadBlog);
  yield takeLatest(types.LOAD_RECENT_BLOGS_REQUEST, loadRecentBlogs);
  yield takeLatest(types.LOAD_RELATED_BLOGS_REQUEST, loadRelatedBlogs);
  yield takeLatest(types.LOAD_ARCHIVES_REQUEST, loadArchives);

  yield takeLatest(types.LOAD_BLOG_LIST_REQUEST, loadBlogList);
  yield takeLatest(types.LOAD_BLOG_BY_AUTHOR_REQUEST, loadBlogByAuthor);
  yield takeLatest(types.LOAD_BLOG_BY_TAG_REQUEST, loadBlogByTag);
  yield takeLatest(types.LOAD_BLOG_DATE_REQUEST, loadBlogDate);
  yield takeLatest(types.LOAD_CATEGORY_REQUEST, loadCategory);
  yield takeLatest(types.LOAD_BLOG_OF_CAT_REQUEST, loadBlogOfCat);
}
