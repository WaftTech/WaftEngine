import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import { makeSelectOne } from './selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadComment(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `comment/${action.payload}`,
      actions.loadCommentSuccess,
      actions.loadCommentFailure,
      token,
    ),
  );
}

function* deleteComment(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `comment/${action.payload}`,
      actions.deleteCommentSuccess,
      actions.deleteCommentFailure,
      token,
    ),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `comment/one/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* postComment(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  const onSuccess = data._id
    ? actions.editCommentSuccess
    : actions.postCommentSuccess;
  yield call(
    Api.post('comment', onSuccess, actions.postCommentFailure, data, token),
  );
}

// Individual exports for testing
export default function* commentsSaga() {
  yield takeLatest(types.LOAD_COMMENT_REQUEST, loadComment);
  yield takeLatest(types.POST_COMMENT_REQUEST, postComment);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.DELETE_COMMENT_REQUEST, deleteComment);
}
