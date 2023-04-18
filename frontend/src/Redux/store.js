/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';

import UserReducer from './user.reduce';
import FileReducer from './file.reduce';
import ReportReducer from './report.reduce';

const store = configureStore({
  reducer: {
    UserReducer,
    FileReducer,
    ReportReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

export default store;
