import { SET_FORMS_NAME_DATA } from './type.redux';

const initialState = {
  formsName: [],
};

// eslint-disable-next-line default-param-last
const ReportReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_FORMS_NAME_DATA:
      return { ...state, formsName: payload };

    default:
      return state;
  }
};

export default ReportReducer;
