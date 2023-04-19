/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { setAccessToken } from './tokenHelpers';
import authFetch from './authFetch';
import { getUserLoaderAction, setUserAction } from '../Redux/user.action';
import { getLocationsAction } from '../Redux/report.action';

export const refreshAccessToken = (navigate) => async (dispatch) => {
  try {
    // const refreshToken = getRefreshToken();
    const response = await authFetch(
      'http://localhost:3001/api/v2/auth/refresh',
      {
        method: 'GET',
        credentials: 'include',
      },
    );

    if (response.status === 422) {
      navigate('/');
      throw new Error('Failed to refresh access token');
    } else {
      const data = await response.json();
      const newAccessToken = data.accessToken;
      setAccessToken(newAccessToken);
      dispatch(setUserAction(data.userFront));
      dispatch(getUserLoaderAction(true));
      dispatch(getLocationsAction(navigate));
      return newAccessToken;
    }
  } catch (error) {
    // Handle error, for example, dispatch an action to show an error message
    throw error;
  }
};
