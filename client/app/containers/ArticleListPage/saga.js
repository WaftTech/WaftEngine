import { takeLatest, take, call, put, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get('articles', actions.loadAllSuccess, actions.loadAllFailure, token),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `articles/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* addEdit(action) {
  const token = yield select(makeSelectToken());
  const { ArticleImage, ...data } = action.payload;
  // const files = {ProfileImage, ProfileImage1};
  const files = [ArticleImage];
  yield call(
    Api.multipartPost(
      'articles',
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
