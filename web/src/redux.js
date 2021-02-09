import * as api from './api.js';

import {
    createAsyncThunk,
    configureStore,
    createSlice,
    createEntityAdapter
} from '@reduxjs/toolkit';

export const findAllItems = createAsyncThunk(
    'items/find-all',
    async (_, thunk) => {
        const token = selectToken(thunk.getState());
        const response = await api.items.find(token);
        return response;
    }
);

export const postItem = createAsyncThunk(
    'items/post',
    async (data, thunk) => {
        const token = selectToken(thunk.getState());
        const response = await api.items.post(data, token);
        return response;
    }
);

export const patchItem = createAsyncThunk(
    'items/patch',
    async ({id, data}, thunk) => {
        const token = selectToken(thunk.getState());
        const response = await api.items.patch(id, data, token);
        return {
            id: response.id,
            changes: response
        };
    }
);

export const deleteItem = createAsyncThunk(
    'items/delete',
    async (id, thunk) => {
        const token = selectToken(thunk.getState());
        const response = await api.items.delete(id, token);
        return response.id;
    }
);

export const itemAdapter = createEntityAdapter({
    sortComparer: (a, b) => {
        const name = a.name.localeCompare(b.name);
        const location = a.name.localeCompare(b.location);
        return name !== 0
            ? name
            : location;
    }
});

export const itemSlice = createSlice({
    name: 'items',
    initialState: itemAdapter.getInitialState(),
    reducers: { },
    extraReducers: {
        [findAllItems.fulfilled]: itemAdapter.setAll,
        [postItem.fulfilled]: itemAdapter.addOne,
        [patchItem.fulfilled]: itemAdapter.updateOne,
        [deleteItem.fulfilled]: itemAdapter.removeOne
    }
});

export const itemSelector = itemAdapter.getSelectors(
    state => state.items);

export default configureStore({
    reducer: {
        items: itemSlice.reducer
    }
});
