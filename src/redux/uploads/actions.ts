//Create Reducer Call--->
export const createUploadImagesRequest = (data: any, id: string) => ({
    type: 'CREATE_UPLOAD_IMAGES_REQUEST',
    payload: { data, id },
});

export const createUploadImagesSuccess = (data: any) => ({
    type: 'CREATE_UPLOAD_IMAGES_SUCCESS',
    payload: { data },
});

export const createUploadImagesFailure = (errorMessage: string) => ({
    type: 'CREATE_UPLOAD_IMAGES_FAILURE',
    errorMessage: { errorMessage },
});

export const resetCreateUploadImages = () => ({
    type: 'RESET_CREATE_UPLOAD_IMAGES',
});
