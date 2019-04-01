import { delay } from 'redux-saga';
import { takeLatest, fork, put, cancel, take, select, call } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* saveContact(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.post(
      'contact',
      actions.saveContactSuccess,
      actions.saveContactFailure,
      action.payload,
      token,
    ),
  );
  yield call(delay, 5000);
  yield put(actions.clearMessages());
}
function* loadContactDetail(action) {
  yield call(
    Api.get(
      `contents/key/contactdetail`,
      actions.contactDetailSuccess,
      actions.contactDetailFailure,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.SAVE_CONTACT_REQUEST, saveContact);
  yield takeLatest(types.CONTACT_DETAIL_REQUEST, loadContactDetail);
}
