import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from 'utils/Api';
import { push } from 'connected-react-router';
import { makeSelectToken } from '../../App/selectors';
import { makeSelectOne, makeSelectSubMenu } from './selectors';
import * as types from './constants';
import * as actions from './actions';
import { enqueueSnackbar } from '../../App/actions';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(`menu`, actions.loadAllSuccess, actions.loadAllFailure, token),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `menu/detail/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

// function* loadMenu(action) {
//   const token = yield select(makeSelectToken());
//   yield call(
//     Api.get(
//       `menu/menuitem/${action.payload}`,
//       actions.loadMenuSuccess,
//       actions.loadMenuFailure,
//       token,
//     ),
//   );
// }

// add parent menu
function* addEdit(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  yield call(
    Api.post(
      `menu`,
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      token,
    ),
  );
}

function* addEditSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  yield put(push('/admin/menu-manage'));
}

// add parent menu also with the ability to add child_menu
function* addEdit2(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  yield call(
    Api.post(
      `menu`,
      actions.addEditSuccess2,
      actions.addEditFailure2,
      data,
      token,
    ),
  );
}

function* addEdit2SuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  yield put(actions.showSubMenu(true));
  // yield put(actions.loadMenuRequest(action.payload.data._id));
}

function* addEdit2FailureFunc(action) {
  const defaultError = {
    message: action.payload.msg || 'something went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultError));
}

// add child menu
function* addEditChild(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectSubMenu());
  yield call(
    Api.post(
      `menu/menuitem`,
      actions.addEditChildSuccess,
      actions.addEditChildFailure,
      data,
      token,
    ),
  );
}

function* addEditChildSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  // yield put(push('/admin/menu-manage'));
}

function* deleteOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `menu/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
}

function* deleteOneSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteOneFailureFunc(action) {
  const defaultError = {
    message: action.payload.msg || 'something went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultError));
}

// Individual exports for testing
export default function* menuManageSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  // yield takeLatest(types.LOAD_MENU_REQUEST, loadMenu);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);
  yield takeLatest(types.ADD_EDIT_CHILD_REQUEST, addEditChild);
  yield takeLatest(types.ADD_EDIT_CHILD_SUCCESS, addEditChildSuccessFunc);
  yield takeLatest(types.ADD_EDIT_REQUEST_2, addEdit2);
  yield takeLatest(types.ADD_EDIT_SUCCESS_2, addEdit2SuccessFunc);
  yield takeLatest(types.ADD_EDIT_FAILURE_2, addEdit2FailureFunc);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteOne);
  yield takeLatest(types.DELETE_ONE_SUCCESS, deleteOneSuccessFunc);
  yield takeLatest(types.DELETE_ONE_FAILURE, deleteOneFailureFunc);
}
