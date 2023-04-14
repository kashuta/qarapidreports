/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';

import UserReducer from './user.reduce';
import FileReducer from './file.reduce';

const store = configureStore({
  reducer: {
    UserReducer,
    FileReducer,
  },
});

export default store;
