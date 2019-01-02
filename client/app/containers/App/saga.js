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

  yield call(
    Api.get(
      `notification`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token
    )
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
}
