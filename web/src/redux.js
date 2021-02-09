import { configureStore } from '@reduxjs/toolkit';

import * as api from './api.js';
import itemSlice from './item.redux.js';

export default configureStore({
    reducer: {
        items: itemSlice.reducer
    }
});
