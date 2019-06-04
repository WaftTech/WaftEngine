import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadAll(action) {
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
      `media?page=0${query}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `media/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* addMedia(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.multipartPost(
      'media/single/media',
      actions.addMediaSuccess,
      actions.addMediaFailure,
      {},
      { file: action.payload[0] },
      token,
    ),
  );
}
function* deleteMedia(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `media/${action.payload}`,
      actions.deleteOneSuccess,
      actions.addMediaFailure,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_MEDIA_REQUEST, addMedia);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteMedia);
}
