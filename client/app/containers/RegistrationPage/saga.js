import {
  takeLatest,
  take,
  call,
  fork,
  put,
  select,
  cancel
} from "redux-saga/effects";
import { push, LOCATION_CHANGE } from "react-router-redux";
import Api from "utils/Api";
import { makeSelectToken } from "../App/selectors";
import * as types from "./constants";
import * as actions from "./actions";

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  let search = "";
  let sort = `${action.payload}`;
  if (action.payload) {
    Object.keys(action.payload).map(each => {
      search = `${each}=${action.payload[each]}${search}`;
    });
  }
  yield call(
    Api.get(
      `registration?find_${search}&page=1&perpage=10&sort=${sort}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token
    )
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `registration/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token
    )
  );
}
function* deleteOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `registration/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token
    )
  );
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push("/wt/registration-manage"));
}

function* addEdit(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const { ...data } = action.payload;
  yield fork(
    Api.post(
      "registration",
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      token
    )
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteOne);
}
