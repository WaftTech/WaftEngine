import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadAllSettings(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `setting`,
      actions.loadAllSettingsSuccess,
      actions.loadAllSettingsFailure,
      token,
    ),
  );
}

// Individual exports for testing
export default function* settingsManagePageSaga() {
  yield takeLatest(types.LOAD_ALL_SETTINGS_REQUEST, loadAllSettings);
}
