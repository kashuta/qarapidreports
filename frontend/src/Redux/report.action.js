/* eslint-disable */
import { refreshAccessToken } from '../JWT/authActions';
import authFetch from '../JWT/authFetch';
import {
  SET_FORMS_NAME_DATA,
  SET_REPORT_FIELDS,
  GET_INSPECTORS_NAMES,
  GET_FORMRESPONSE_DATA,
  GET_LOCATIONS,
  GET_FORM_ALL_PROFILE_INSPECTOR,
  GET_FORM_DATE_PROFILE_INSPECTOR,
  DELETE_LOCATION,
  SET_NEW_LOCATION,
  GET_INSPECTOR_STAT,
  GET_HSE_FORM_STAT,
} from './type.redux';

export const getInspectorStat = (navigate, email, data) => async (dispatch) => {
  try {
    console.log('{{{{{{{{{{{{{{{{{{{{{{{first}}}}}}}}}}}}}}}}}}}}}}}');
    const response = await authFetch(
      'http://localhost:3001/api/v2/form/get_inspector_stat',
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, data }),
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
      await dispatch(getInspectorStat());
    } else if (response.ok) {
      const result = await response.json();
      dispatch({
        type: GET_INSPECTOR_STAT,
        payload: result,
      });
      // Process the data
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFormsAllProfileInspectorAction =
  (navigate) => async (dispatch) => {
    try {
      const response = await authFetch(
        'http://localhost:3001/api/v2/form/get_all_data_for_one_inspector',
        {
          credentials: 'include',
          method: 'POST',
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
        await dispatch(getFormsAllProfileInspectorAction());
      } else if (response.ok) {
        const result = await response.json();
        dispatch({
          type: GET_FORM_ALL_PROFILE_INSPECTOR,
          payload: result,
        });
        // Process the data
      }
    } catch (error) {
      console.log(error);
    }
  };

// export const getFormsByDateProfileInspectorAction = (navigate, data) => async (dispatch) => {
//   try {
//     const response = await authFetch(
//       'http://localhost:3001/api/v2/form/get_by_date_data_for_one_inspector',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ data }),
//         credentials: 'include',
//       },
//     );
//     if (response.status === 401) {
//       const newAccessToken = await dispatch(refreshAccessToken());
//       if (!newAccessToken) {
//         navigate('/login');
//         return;
//         // Handle error, for example, redirect to the login page or show an error message
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getFormsByDateProfileInspectorAction =
  (navigate, data) => async (dispatch) => {
    try {
      const response = await authFetch(
        'http://localhost:3001/api/v2/form/get_by_date_data_for_one_inspector',
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
        }
        await dispatch(getFormsByDateProfileInspectorAction());
      } else if (response.ok) {
        const result = await response.json();
        dispatch({
          type: GET_FORM_DATE_PROFILE_INSPECTOR,
          payload: result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(result);
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

export const addNewLocationAction =
  (addLocation, navigate) => async (dispatch) => {
    try {
      const response = await authFetch(
        'http://localhost:3001/api/v2/locations/addlocation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ addLocation }),
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
        await dispatch(addNewLocationAction(addLocation, navigate));
      } else if (response.status === 200) {
        // navigate('/');
        const result = await response.json();
        console.log(result);
        dispatch({
          type: SET_NEW_LOCATION,
          payload: result,
        });
        alert(`Location ${result.name} is available`);
        // dispatch({ type: GET_LOCATIONS, payload: result });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const deleteLocationAction = (name, navigate) => async (dispatch) => {
  try {
    const response = await authFetch(
      'http://localhost:3001/api/v2/locations/deletelocation',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
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
      await dispatch(deleteLocationAction(name, navigate));
    } else if (response.status === 200) {
      const result = await response.json();
      // navigate('/');
      alert(result.message);
      dispatch({ type: DELETE_LOCATION, payload: name });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getHSEFormDataAction = (data, navigate) => async (dispatch) => {
  try {
    const response = await authFetch(
      'http://localhost:3001/api/v2/form/get_hse_form_params',
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
      await dispatch(getHSEFormDataAction());
    }
    if (response.message) {
      alert(response.message);
    } else if (response.ok) {
      // navigate('/');
      const result = await response.json();
      // alert(result.message);
      dispatch({ type: GET_HSE_FORM_STAT, payload: result });
    }
  } catch (error) {
    console.log(error);
  }
};
