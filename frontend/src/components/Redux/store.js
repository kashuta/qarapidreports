/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';

import UserReducer from './user.reduce';

const store = configureStore({
  reducer: {
    UserReducer,
  },
});

export default store;
