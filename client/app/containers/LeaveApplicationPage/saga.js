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
  let sort = "";
  let pageNumber = "";
  let sizeOfPage = "";
  if (action.payload.query) {
    // {payload, metadata}
    //{payload: {query, sort}}
    Object.keys(action.payload.query).map(each => {
      search = `${each}=${action.payload.query[each]}&${search}`;
    });
    search = `&find_${search}`;
  }
  if (action.payload.sort) {
    sort = `&sort=${action.payload.sort}`;
  }
  if (action.payload) {
    pageNumber = `&page=${action.payload.page}&size=${
      action.payload.rowsPerPage
    }`;
  }
  yield call(
    Api.get(
      `leaveapplication?${search}${sort}${sizeOfPage}${pageNumber}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token
    )
  );
}

function* employeeList(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `user/getunderlist`,
      actions.loadEmployeeSuccess,
      actions.loadEmployeeFailure,
      token
    )
  );
}
function* getLeaveType(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `assignedleave/getassignedleavelist/${action.payload}`,
      actions.loadLeaveTypeSuccess,
      actions.loadLeaveTypeFailure,
      token
    )
  );
}
function* getTotalLeaveDays(action) {
  const token = yield select(makeSelectToken());
  const { ...data } = action.payload.leaveDetail;

  yield fork(
    Api.post(
      "leaveapplication/noofdays",
      actions.loadTotalLeaveDaysSuccess,
      actions.loadTotalLeaveDaysFailure,
      data,
      token
    )
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `leaveapplication/${action.payload}`,
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
      `leaveapplication/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token
    )
  );
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push("/wt/leaveApplication-manage"));
}

function* addEdit(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const { ...data } = action.payload;
  yield fork(
    Api.post(
      "leaveapplication",
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
  yield takeLatest(types.LOAD_EMPLOYEE_REQUEST, employeeList);
  yield takeLatest(types.LOAD_LEAVETYPE_REQUEST, getLeaveType);
  yield takeLatest(types.LOAD_TOTAL_LEAVE_DAYS_REQUEST, getTotalLeaveDays);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteOne);
}
