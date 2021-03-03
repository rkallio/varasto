import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter,
} from '@reduxjs/toolkit';

import * as api from '../api.js';
import { selector as tokenSelector } from '../login/auth.redux.js';

export const findAll = createAsyncThunk(
    'transients/find-all',
    async (_, thunk) => {
        const token = tokenSelector(thunk.getState());
        const response = await api.transients.findAll(token);
        return response;
    }
);

export const create = createAsyncThunk(
    'transients/create',
    async (data, thunk) => {
        const token = tokenSelector(thunk.getState());
        const response = await api.transients.post(data, token);
        return response;
    }
);

export const update = createAsyncThunk(
    'transients/update',
    async ({ id, data }, thunk) => {
        const token = tokenSelector(thunk.getState());
        const response = await api.transients.patch(id, data, token);
        return {
            id: response.id,
            changes: response,
        };
    }
);

export const remove = createAsyncThunk(
    'transients/remove',
    async (id, thunk) => {
        const token = tokenSelector(thunk.getState());
        const response = await api.transients.delete(id, token);
        return response.id;
    }
);

export const toggleCompleted = createAsyncThunk(
    'transients/toggle-completed',
    async (id, thunk) => {
        const token = tokenSelector(thunk.getState());
        const tsnt = selector.selectById(thunk.getState(), id);
        const response = await api.transients.patch(
            id,
            {
                completed: !tsnt.completed,
            },
            token
        );

        return {
            id: response.id,
            changes: response,
        };
    }
);

export const entityAdapter = createEntityAdapter({
    sortComparer: (a, b) => {
        return a.name.localeCompare(b.name);
    },
});

export default slice = createSlice({
    name: 'transients',
    initialState: entityAdapter.getInitialState(),
    reducers: {
        addOne: entityAdapter.addOne,
        removeOne: entityAdapter.removeOne,
        updateOne: entityAdapter.updateOne,
        removeMany: entityAdapter.removeMany,
    },
    extraReducers: {
        [findAll.fulfilled]: entityAdapter.setAll,
        [create.fulfilled]: entityAdapter.addOne,
        [update.fulfilled]: entityAdapter.updateOne,
        [remove.fulfilled]: entityAdapter.removeOne,
    },
});

export const actions = slice.actions;
export const selector = entityAdapter.getSelectors(
    (state) => state.transients
);
