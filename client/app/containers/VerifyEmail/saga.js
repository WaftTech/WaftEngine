import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
// import { enqueueSnackbar } from '../App/actions';
import * as types from './constants';
import * as actions from './actions';

function* verifyEmail(action) {
  const token = yield select(makeSelectToken());
  const data = { email: action.payload.email, code: action.payload.code };
  yield call(
    Api.post(
      `user/verifymail`,
      actions.loadVerifyEmailSuccess,
      actions.loadVerifyEmailFailure,
      data,
      token,
    ),
  );
}
function* verifyEmailFailFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while verifying!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

// Individual exports for testing
export default function* verifyEmailSaga() {
  yield takeLatest(types.LOAD_VERIFY_EMAIL_REQUEST, verifyEmail);
  yield takeLatest(types.LOAD_VERIFY_EMAIL_FAILURE, verifyEmailFailFunc);
}
