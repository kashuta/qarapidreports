/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { setAccessToken } from './tokenHelpers';
import authFetch from './authFetch';
import { getUserLoaderAction, setUserAction } from '../Redux/user.action';

export const refreshAccessToken = () => async (dispatch) => {
  try {
    // const refreshToken = getRefreshToken();
    const response = await authFetch('http://localhost:3001/api/v2/refresh', {
      method: 'GET',
      credentials: 'include',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    });

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const data = await response.json();
    const newAccessToken = data.accessToken;
    setAccessToken(newAccessToken);
    dispatch(setUserAction(data.userFront));
    dispatch(getUserLoaderAction(true));
    return newAccessToken;
  } catch (error) {
    // Handle error, for example, dispatch an action to show an error message
    throw error;
  }
};
