import { takeLatest, call, select } from 'redux-saga/effects';
// import { push, LOCATION_CHANGE } from 'connected-react-router';
import Api from 'utils/Api';
import * as types from './constants';
import { makeSelectToken } from '../App/selectors';
import * as actions from './actions';

function* loadSubscriber(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload) {
    Object.keys(action.payload).map(each => {
      query = `${query}&${each}=${action.payload[each]}`;
      return null;
    });
  }
  yield call(
    Api.get(
      `subscribe?${query}`,
      actions.loadSubscriberSuccess,
      actions.loadSubscriberFailure,
      token,
    ),
  );
}
function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `subscribe/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}
// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(types.LOAD_SUBSCRIBER_REQUEST, loadSubscriber);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
}
