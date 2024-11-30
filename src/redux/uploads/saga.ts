// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createUploadImages } from '../../api/UploadImagesApi'; // Adjust the path as needed
import { createUploadImagesSuccess, createUploadImagesFailure } from './actions';

// // Saga to handle creating a uploadImages
function* createUploadImagesSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(createUploadImages, action.payload.data, action.payload.id);
        yield put(createUploadImagesSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';

        yield put(createUploadImagesFailure(errorMessage));
    }
}

export default function* uploadImagesSaga() {
    yield takeEvery('CREATE_UPLOAD_IMAGES_REQUEST', createUploadImagesSaga);
}
