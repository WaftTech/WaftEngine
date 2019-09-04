import Api from 'utils/Api';
import { takeLatest, call, select } from 'redux-saga/effects';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadCategory() {
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

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_CATEGORY_REQUEST, loadCategory);
}
