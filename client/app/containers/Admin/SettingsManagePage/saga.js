import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* defaultAction(action) {
  const token = yield select(makeSelectToken());
  //  yield call(
  //    Api.get(
  //      `someroute/${action.payload}`,
  //      actions.defaultActionSuccess,
  //      actions.defaultActionFailure,
  //      token,
  //    ),
  //  );
}

// Individual exports for testing
export default function* settingsManagePageSaga() {
  yield takeLatest(types.DEFAULT_ACTION_REQUEST, defaultAction);
}
