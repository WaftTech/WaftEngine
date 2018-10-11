import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadOrg({ payload }) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `home/org/${payload}`,
      actions.loadOrgSuccess,
      actions.loadOrgFailure,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ORG_REQUEST, loadOrg);
}
