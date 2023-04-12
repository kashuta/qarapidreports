import { UPLOAD_AVATAR_PHOTO } from './type.redux';

const initialState = {
  avatar: null,
  photo: null,
};

// eslint-disable-next-line default-param-last
const FileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_AVATAR_PHOTO:
      return { ...state, avatar: payload };

    default:
      return state;
  }
};

export default FileReducer;
