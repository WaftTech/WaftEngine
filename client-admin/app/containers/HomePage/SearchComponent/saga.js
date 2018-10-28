import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectSearchCategory, makeSelectSearchText } from './selectors';

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

function* search(action) {
  const token = yield select(makeSelectToken());
  const categoryId = yield select(makeSelectSearchCategory());
  const searchText = yield select(makeSelectSearchText());

  yield call(
    Api.get(
      `home/search/${categoryId}/${searchText}`,
      actions.searchSuccess,
      actions.searchFailure,
      token,
    ),
  );
}
export default function* defaultSaga() {
  yield takeLatest(types.LOAD_CATEGORIES_REQUEST, loadCategories);
  yield takeLatest(types.SEARCH_REQUEST, search);
}
