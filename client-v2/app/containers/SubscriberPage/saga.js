import { take, takeLatest, put, select, fork } from 'redux-saga/effects';
import Api from 'utils/Api';
import { LOCATION_CHANGE, push } from 'connected-react-router';
import { makeSelectEmail } from './selectors';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectToken } from '../App/selectors';

export const validate = data => {
  const errors = {};
  if (!data.email) errors.email = 'email is required';
  return { errors, isValid: !Object.keys(errors).length };
};

// export function* redirectOnSuccess() {
//   yield take(types.SAVE_SUBSCRIBER_SUCCESS);
//   yield put(push('/subscribe'));
//   yield actions.clearStoreValue;
// }

export function* saveSubscriber() {
  const token = yield select(makeSelectToken());
  const email = yield select(makeSelectEmail());
  const data = { email };
  const errors = validate(data);
  if (errors.isValid) {
    // const successWatcher = yield fork(redirectOnSuccess);
    yield fork(
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
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(types.SAVE_SUBSCRIBER_REQUEST, saveSubscriber);
}
