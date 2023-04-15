import { SET_FORMS_NAME_DATA, SET_REPORT_FIELDS } from './type.redux';

const initialState = {
  formsName: [],
  reportFields: [],
};

// eslint-disable-next-line default-param-last
const ReportReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_FORMS_NAME_DATA:
      return { ...state, formsName: payload };
    case SET_REPORT_FIELDS:
      return { ...state, reportFields: [...state.reportFields, payload] };

    default:
      return state;
  }
};

export default ReportReducer;
