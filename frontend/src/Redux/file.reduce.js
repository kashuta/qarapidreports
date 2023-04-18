import { SET_IMAGES, SET_IMAGES_NAMES, UPLOAD_AVATAR_PHOTO } from './type.redux';

const initialState = {
  avatar: null,
  photo: null,
  images: [],
  imageNames: [],
};

// eslint-disable-next-line default-param-last
const FileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_AVATAR_PHOTO:
      return { ...state, avatar: payload };

    case SET_IMAGES:
      return { ...state, images: payload };

    case SET_IMAGES_NAMES:
      return { ...state, imageNames: payload };

    default:
      return state;
  }
};

export default FileReducer;
