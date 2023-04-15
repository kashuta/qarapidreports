import { refreshAccessToken } from '../JWT/authActions';
import authFetch from '../JWT/authFetch';
import { SET_FORMS_NAME_DATA } from './type.redux';

export const setFormsNameAction = (navigate) => async (dispatch) => {
  try {
    const response = await authFetch(
      'http://localhost:3001/api/v2/form/form_names',
      {
        credentials: 'include',
      },
    );
    if (response.status === 401) {
      const newAccessToken = await dispatch(refreshAccessToken());
      if (!newAccessToken) {
        navigate('/login');
        return;
        // Handle error, for example, redirect to the login page or show an error message
      }
      // Retry the request with the new access token
      await dispatch(setFormsNameAction(navigate));
    } else if (response.ok) {
      const result = await response.json();
      dispatch({
        type: SET_FORMS_NAME_DATA,
        payload: result,
      });
      // Process the data
    }
  } catch (error) {
    console.log(error);
  }
};
