import { takeLatest, take, call, put, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get('link', actions.loadAllSuccess, actions.loadAllFailure, token),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `link/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* addEdit(action) {
  const token = yield select(makeSelectToken());
  const { ProfileImage, ProfileImage1, ...data } = action.payload;
  const files = {ProfileImage, ProfileImage1};
  yield call(
    Api.multipartPost(
      'link',
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      files,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
}
