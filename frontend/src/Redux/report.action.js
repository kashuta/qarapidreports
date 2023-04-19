/* eslint-disable operator-linebreak */
import { refreshAccessToken } from '../JWT/authActions';
import authFetch from '../JWT/authFetch';
import {
  SET_FORMS_NAME_DATA,
  SET_REPORT_FIELDS,
  GET_INSPECTORS_NAMES,
  GET_FORMRESPONSE_DATA,
  GET_LOCATIONS,
} from './type.redux';

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

export const createReportAction = (data, navigate) => async (dispatch) => {
  try {
    const response = await authFetch(
      'http://localhost:3001/api/v2/form/form_save_data',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
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
      await dispatch(createReportAction(data, navigate));
    } else if (response.ok) {
      // navigate('/');
      const result = await response.json();
      alert(result.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const setReportFieldsAction = (formId, navigate) => async (dispatch) => {
  try {
    const response = await authFetch(
      `http://localhost:3001/api/v2/form/form_data/${formId}`,
      {
        // method: 'POST',
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
      await dispatch(createReportAction(formId));
    } else if (response.ok) {
      // navigate('/');
      const result = await response.json();
      // alert(result.message);
      dispatch({ type: SET_REPORT_FIELDS, payload: result });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getInspectorsNamesAction = (navigate) => async (dispatch) => {
  try {
    const response = await authFetch(
      'http://localhost:3001/api/v2/form/inspectors_names_data',
      {
        // method: 'POST',
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
      await dispatch(getInspectorsNamesAction());
    } else if (response.ok) {
      // navigate('/');
      const result = await response.json();
      // alert(result.message);
      dispatch({ type: GET_INSPECTORS_NAMES, payload: result });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFormResponseDataAction =
  (data, navigate) => async (dispatch) => {
    try {
      const response = await authFetch(
        'http://localhost:3001/api/v2/form/form_data_for_dashboard',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data }),
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
        await dispatch(getFormResponseDataAction());
      }
      if (response.message) {
        alert(response.message);
      } else if (response.ok) {
        // navigate('/');
        const result = await response.json();
        // alert(result.message);
        dispatch({ type: GET_FORMRESPONSE_DATA, payload: result });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getLocationsAction = (navigate) => async (dispatch) => {
  try {
    const response = await authFetch(
      'http://localhost:3001/api/v2/locations/getlocation',
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
      await dispatch(getLocationsAction());
    } else if (response.ok) {
      // navigate('/');
      const result = await response.json();
      // alert(result.message);
      dispatch({ type: GET_LOCATIONS, payload: result });
    }
  } catch (error) {
    console.log(error);
  }
};
