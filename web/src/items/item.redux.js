import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter,
} from '@reduxjs/toolkit';

import * as api from '../api.js';
import { selector as tokenSelector } from '../login/auth.redux.js';

export const findAllItems = createAsyncThunk(
    'items/find-all',
    async (_, thunk) => {
        const token = tokenSelector(thunk.getState());
        const response = await api.items.find(token);
        return response;
    }
);

export const postItem = createAsyncThunk(
    'items/post',
    async (data, thunk) => {
        const token = tokenSelector(thunk.getState());
        const response = await api.items.post(data, token);
        return response;
    }
);

export const patchItem = createAsyncThunk(
    'items/patch',
    async ({ id, data }, thunk) => {
        const token = tokenSelector(thunk.getState());
        const response = await api.items.patch(id, data, token);
        return {
            id: response.id,
            changes: response,
        };
    }
);

export const deleteItem = createAsyncThunk(
    'items/delete',
    async (id, thunk) => {
        const token = tokenSelector(thunk.getState());
        const response = await api.items.delete(id, token);
        return response.id;
    }
);

export const itemAdapter = createEntityAdapter({
    sortComparer: (a, b) => {
        const name = a.name.localeCompare(b.name);
        const location = a.location.localeCompare(b.location);
        return location !== 0 ? location : name;
    },
});

export default itemSlice = createSlice({
    name: 'items',
    initialState: itemAdapter.getInitialState(),
    reducers: {
        addOne: itemAdapter.addOne,
        removeOne: itemAdapter.removeOne,
        updateOne: itemAdapter.updateOne,
    },
    extraReducers: {
        [findAllItems.fulfilled]: itemAdapter.setAll,
        [postItem.fulfilled]: itemAdapter.addOne,
        [patchItem.fulfilled]: itemAdapter.updateOne,
        [deleteItem.fulfilled]: itemAdapter.removeOne,
    },
});

export const actions = itemSlice.actions;

export const itemSelector = itemAdapter.getSelectors(
    (state) => state.items
);
