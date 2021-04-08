import {
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import socketMiddleware from './socket-middleware.js';

import itemSlice from './items/item.redux.js';
import transientSlice from './transients/transient.redux.js';
import authSlice from './login/auth.redux.js';
import modalSlice from './modal/modal.redux.js';

export default configureStore({
  reducer: {
    items: itemSlice.reducer,
    transients: transientSlice.reducer,
    auth: authSlice.reducer,
    modal: modalSlice.reducer,
  },
  middleware: [...getDefaultMiddleware(), socketMiddleware],
});
