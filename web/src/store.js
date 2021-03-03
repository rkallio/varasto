import {
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';

import socketMiddleware from './socket-middleware.js';

import * as api from './api.js';
import itemSlice from './items/item.redux.js';
import transientSlice from './transient.redux.js';
import authSlice from './auth.redux.js';
import modalSlice from './modal/modal.redux.js';

export default configureStore({
    reducer: {
        items: itemSlice.reducer,
        transients: transientSlice.reducer,
        auth: authSlice.reducer,
        modal: modalSlice.reducer,
    },
    middleware: [...getDefaultMiddleware(), socketMiddleware()],
});
