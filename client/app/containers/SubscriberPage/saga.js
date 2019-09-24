import { take, takeLatest, put, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { LOCATION_CHANGE, push } from 'connected-react-router';
import { makeSelectEmail } from './selectors';
import { enqueueSnackbar } from '../App/actions';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectToken } from '../App/selectors';

export const validate = data => {
  const errors = {};
  if (!data.email) errors.email = 'email is required';
  return { errors, isValid: !Object.keys(errors).length };
};

export function* saveSubscriber() {
  const token = yield select(makeSelectToken());
  const email = yield select(makeSelectEmail());
  const data = { email };
  const errors = validate(data);
  if (errors.isValid) {
    yield call(
      Api.post(
        `subscribe`,
        actions.saveSubscriberSuccess,
        actions.saveSubscriberFailure,
        { email },
        token,
      ),
    );
    yield take(LOCATION_CHANGE, types.SAVE_SUBSCRIBER_FAILURE);
    yield cancel(successWatcher);
  } else {
    yield put(actions.setStoreValue({ key: 'errors', value: errors.errors }));
  }
}

function* saveSubscriberSuccessFunc(action) {
  yield put(
    enqueueSnackbar({
      message: action.payload.msg || 'subscribe success!!',
      options: {
        variant: 'success',
      },
    }),
  );
}

function* saveSubscriberFailFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while deleting!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(types.SAVE_SUBSCRIBER_REQUEST, saveSubscriber);
  yield takeLatest(types.SAVE_SUBSCRIBER_SUCCESS, saveSubscriberSuccessFunc);
  yield takeLatest(types.SAVE_SUBSCRIBER_FAILURE, saveSubscriberFailFunc);
}
