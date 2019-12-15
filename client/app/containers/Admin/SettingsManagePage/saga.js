import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from 'utils/Api';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import { makeSelectToken } from '../../App/selectors';
import { enqueueSnackbar } from '../../App/actions';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectSettingsNormalized } from './selectors';

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

function* editSettings(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectSettingsNormalized());
  yield call(
    Api.post(
      `setting/all`,
      actions.editSettingsSuccess,
      actions.editSettingsFailure,
      data,
      token,
    ),
  );
}

function* editSettingSuccFunc(action) {
  yield put(
    enqueueSnackbar({
      message: action.payload.msg || 'settings edit success!!',
      options: {
        variant: 'success',
      },
    }),
  );
}

function* editSettingFailFunc(action) {
  yield put(
    enqueueSnackbar({
      message: action.payload.msg || 'Error while editing settings!!',
      options: {
        variant: 'warning',
      },
    }),
  );
}

// Individual exports for testing
export default function* settingsManagePageSaga() {
  yield takeLatest(types.LOAD_ALL_SETTINGS_REQUEST, loadAllSettings);
  yield takeLatest(types.EDIT_SETTINGS_REQUEST, editSettings);
  yield takeLatest(types.EDIT_SETTINGS_SUCCESS, editSettingSuccFunc);
  yield takeLatest(types.EDIT_SETTINGS_FAILURE, editSettingFailFunc);
}
