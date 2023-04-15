import {
  SET_REPORT_FIELDS,
} from './type.redux';

const initialState = {
  reportFields: [],
};

// eslint-disable-next-line default-param-last
const ReportReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_REPORT_FIELDS:
      return { ...state, reportFields: [...state.reportFields, payload] };

    default:
      return state;
  }
};

export default ReportReducer;
