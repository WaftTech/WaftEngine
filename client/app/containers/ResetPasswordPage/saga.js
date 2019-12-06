import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import { makeSelectDefaultData } from './selectors';
import * as types from './constants';
import * as actions from './actions';

function* resetAction(action) {
  let data = yield select(makeSelectDefaultData());
  data = { ...data, email: action.payload };
  yield call(
    Api.post(
      `user/resetpassword`,
      actions.loadResetSuccess,
      actions.loadResetFailure,
      { data },
      null,
    ),
  );
}

// Individual exports for testing
export default function* resetPasswordPageSaga() {
  yield takeLatest(types.DEFAULT_ACTION_REQUEST, defaultAction);
  yield takeLatest(types.LOAD_RESET_REQUEST, resetAction);
}
