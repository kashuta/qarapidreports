import {
  SET_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_USER_LOADER,
} from './type.redux';

const initialState = {
  user: null,
  loader: false,
  isError: false,
};

// eslint-disable-next-line default-param-last
const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return { ...state, user: payload };
    case LOGIN_USER:
      return { ...state, user: payload };
    case LOGOUT_USER:
      return { ...state, user: payload };
    case GET_USER_LOADER:
      return { ...state, loader: payload };

    default:
      return state;
  }
};

export default UserReducer;
