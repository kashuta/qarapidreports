import {
  SET_FORMS_NAME_DATA,
  SET_REPORT_FIELDS,
  GET_INSPECTORS_NAMES,
  GET_FORMRESPONSE_DATA,
} from './type.redux';

const initialState = {
  formsName: [],
  reportFields: [],
  inspectorsNames: [],
  formResponseData: [],
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

    default:
      return state;
  }
};

export default ReportReducer;
