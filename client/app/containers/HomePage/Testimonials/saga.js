import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectToken } from '../../App/selectors';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `testimonial`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

// Individual exports for testing
export default function* testimonialsSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
}
