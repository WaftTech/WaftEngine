import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadCategory({ payload }) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `home/cat/${payload}`,
      actions.loadCategorySuccess,
      actions.loadCategoryFailure,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_CATEGORY_REQUEST, loadCategory);
}
