// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createPage, getPage, updatePage } from '../../api/PageApi'; // Adjust the path as needed
import { 
  getPageSuccess, getPageFailure,
  createPageSuccess,
  createPageFailure,
  updatePageSuccess,
  updatePageFailure,
} from './actions';

// Saga to handle fetching pages
function* fetchPageSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getPage, action.payload);
    yield put(getPageSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getPageFailure(errorMessage));
  }
}

// // Saga to handle creating a page
function* createPageSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createPage, action.payload);
    yield put(createPageSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createPageFailure(errorMessage));
  }
}

// // Saga to handle updating a page
function* updatePageSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updatePage, action.payload.data, action.payload.id);
    yield put(updatePageSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updatePageFailure(errorMessage));
  }
}

// // Saga to handle updating a page
// function* deletePageSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deletePage, action.payload.id);
//     yield put(deletePageSuccess(data));
//   } catch (error: any) {
//     yield put(deletePageFailure(error.message));
//   }
// }

export default function* pageSaga() {
  yield takeEvery('GET_PAGE_REQUEST', fetchPageSaga);
  yield takeEvery('CREATE_PAGE_REQUEST', createPageSaga);
  yield takeEvery('UPDATE_PAGE_REQUEST', updatePageSaga);
  // yield takeEvery('DELETE_PAGE_REQUEST', deletePageSaga);
}
