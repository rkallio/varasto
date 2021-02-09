import { configureStore } from '@reduxjs/toolkit';

import * as api from './api.js';
import itemSlice from './item.redux.js';
import authSlice from './auth.redux.js';

export default configureStore({
    reducer: {
        items: itemSlice.reducer,
        auth: authSlice.reducer
    }
});
