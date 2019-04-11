import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadBlogList({ action }) {
  const token = yield select(makeSelectToken());
  yield call(Api.get('blog', actions.loadBlogListSuccess, actions.loadBlogListFailure, token));
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_BLOG_LIST_REQUEST, loadBlogList);
}
