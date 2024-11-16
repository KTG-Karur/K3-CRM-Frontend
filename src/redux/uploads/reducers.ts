// employee/reducers.ts
const initialState = {
  createUploadImagesData: null,
  isLoading: false,
  errorMessage: null,
  createUploadImagesSuccess: false,
  createUploadImagesFailure: false,
};

export default function uploadImagesReducer(state = initialState, action: any) {
  switch (action.type) {
    case "CREATE_UPLOAD_IMAGES_SUCCESS": {
      return {
        ...state,
        createUploadImagesSuccess: true,
        createUploadImagesData: action.payload.data.data,
        createUploadImagesFailure: false,
      };
    }
    case "CREATE_UPLOAD_IMAGES_FAILURE": {
      return {
        ...state,
        createUploadImagesFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createUploadImagesSuccess: false,
      };
    }
    case "RESET_CREATE_UPLOAD_IMAGES": {
      return {
        ...state,
        createUploadImagesSuccess: false,
        createUploadImagesFailure: false,
        createUploadImagesData: null,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
