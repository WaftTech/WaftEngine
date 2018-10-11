import {
  takeLatest,
  call,
  select,
} from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadCategories(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'home/category',
      actions.loadCategoriesSuccess,
      actions.loadCategoriesFailure,
      token,
    ),
  );
}

function* search({ payload }) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `home/search/${payload.categoryId}/${payload.searchText}`,
      actions.loadCategoriesSuccess,
      actions.loadCategoriesFailure,
      token,
    ),
  );
}
export default function* defaultSaga() {
  yield takeLatest(types.LOAD_CATEGORIES_REQUEST, loadCategories);
  yield takeLatest(types.SEARCH_REQUEST, search);
}
