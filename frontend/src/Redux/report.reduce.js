import {
  SET_FORMS_NAME_DATA,
  SET_REPORT_FIELDS,
  GET_INSPECTORS_NAMES,
  GET_FORMRESPONSE_DATA,
  GET_LOCATIONS,
  GET_FORM_ALL_PROFILE_INSPECTOR,
  GET_FORM_DATE_PROFILE_INSPECTOR,
  GET_INSPECTOR_STAT,
  SET_NEW_LOCATION,
  DELETE_LOCATION,
  GET_HSE_FORM_STAT,
} from './type.redux';

const initialState = {
  formsName: [],
  reportFields: [],
  inspectorsNames: [],
  formResponseData: null,
  locations: [],
  FormAllProfileInspector: [],
  FormDateProfileInspector: [],
  inspectorStat: [],
  HSEformDATA: [],
};

// eslint-disable-next-line default-param-last
const ReportReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_FORMS_NAME_DATA:
      return { ...state, formsName: payload };
    case SET_REPORT_FIELDS:
      return { ...state, reportFields: [...state.reportFields, payload] };
    case GET_INSPECTORS_NAMES:
      return { ...state, inspectorsNames: payload };
    case GET_FORMRESPONSE_DATA:
      return { ...state, formResponseData: payload };
    case GET_LOCATIONS:
      return { ...state, locations: payload };
    case SET_NEW_LOCATION:
      return { ...state, locations: [...state.locations, payload] };
    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter((p) => p.name !== payload),
      };
    case GET_FORM_ALL_PROFILE_INSPECTOR:
      return { ...state, FormAllProfileInspector: payload };
    case GET_FORM_DATE_PROFILE_INSPECTOR:
      return { ...state, FormAllProfileInspector: payload };
    case GET_INSPECTOR_STAT:
      return { ...state, inspectorStat: payload };
    case GET_HSE_FORM_STAT:
      return { ...state, HSEformDATA: payload };
    default:
      return state;
  }
};

export default ReportReducer;
