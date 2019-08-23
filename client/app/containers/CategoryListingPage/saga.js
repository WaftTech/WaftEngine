import Api from 'utils/Api';
import { takeLatest, call, select } from 'redux-saga/effects';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadCategory(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'blog/category',
      actions.loadCategorySuccess,
      actions.loadCategoryFailure,
      token,
    ),
  );
}

function* loadBlogs(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get('blog', actions.loadBlogsSuccess, actions.loadBlogsFailure, token),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_CATEGORY_REQUEST, loadCategory);
  yield takeLatest(types.LOAD_BLOGS_REQUEST, loadBlogs);
}
